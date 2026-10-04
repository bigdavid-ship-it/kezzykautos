import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Validate incoming data
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  vehicleId: z.string().uuid().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = contactSchema.parse(body)
    
    const supabase = await createClient()

    // Insert into inquiries table
    const { error } = await supabase
      .from('inquiries')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        vehicle_id: validatedData.vehicleId,
        type: validatedData.vehicleId ? 'Vehicle Inquiry' : 'General Contact',
        status: 'New'
      })

    if (error) {
      console.error('Error inserting inquiry:', error)
      return NextResponse.json(
        { error: 'Failed to submit inquiry' },
        { status: 500 }
      )
    }

    // TODO: Send email notification to admin (Phase 8)

    return NextResponse.json(
      { message: 'Inquiry submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
