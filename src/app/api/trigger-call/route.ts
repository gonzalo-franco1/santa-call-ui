import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const HAPPYROBOT_WEBHOOK_URL = 'https://workflows.platform.happyrobot.ai/hooks/azyq97kxd4ov'

export async function POST(request: Request) {
  try {
    // Verify user is authenticated
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { child_name, child_info, phone_number, scheduled_date } = body

    if (!child_name || !child_info || !phone_number) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Call HappyRobot webhook
    // Use scheduled_date if provided, otherwise use current date
    const webhookPayload = {
      date: scheduled_date || new Date().toISOString(),
      child_name,
      child_info,
      phone_number,
      parent_phone_number: phone_number,
    }

    console.log('=== HAPPYROBOT WEBHOOK CALL ===')
    console.log('URL:', HAPPYROBOT_WEBHOOK_URL)
    console.log('Payload:', JSON.stringify(webhookPayload, null, 2))

    const webhookResponse = await fetch(HAPPYROBOT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    })

    console.log('Response status:', webhookResponse.status)
    console.log('Response headers:', Object.fromEntries(webhookResponse.headers.entries()))
    
    const responseText = await webhookResponse.text()
    console.log('Response body:', responseText)

    if (!webhookResponse.ok) {
      console.error('HappyRobot webhook failed!')
      return NextResponse.json(
        { error: 'Failed to trigger call', details: responseText },
        { status: 500 }
      )
    }

    let result
    try {
      result = JSON.parse(responseText)
    } catch {
      result = { raw: responseText }
    }
    
    console.log('=== WEBHOOK CALL SUCCESSFUL ===')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Call triggered successfully',
      result 
    })

  } catch (error: any) {
    console.error('Error triggering call:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

