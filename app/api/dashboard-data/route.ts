import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey)
/**
 * @swagger
 * /api/dashboard-data:
 *   get:
 *     summary: Retrieve dashboard data
 *     description: Fetch the latest 50 dashboard data entries, ordered by creation time.
 *     responses:
 *       200:
 *         description: A list of dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The data ID
 *                   category:
 *                     type: string
 *                     description: The data category
 *                   value:
 *                     type: number
 *                     description: The value for the data entry
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp of creation
 *       500:
 *         description: Internal server error
 */
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('dashboard_data')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50)

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        console.log('Fetched data:', data)
        return NextResponse.json(data)
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
    }
}

/**
 * @swagger
 * /api/dashboard-data:
 *   post:
 *     summary: Insert new dashboard data
 *     description: Add a new data entry into the dashboard_data table.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category of the data
 *               value:
 *                 type: number
 *                 description: The value for the data
 *     responses:
 *       200:
 *         description: Successfully inserted data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 category:
 *                   type: string
 *                 value:
 *                   type: number
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Internal server error
 */
export async function POST(request: Request) {
    try {
        const { category, value } = await request.json()

        const { data, error } = await supabase
            .from('dashboard_data')
            .insert({ category, value })
            .select()

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        console.log('Inserted data:', data)
        return NextResponse.json(data)
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
    }
}