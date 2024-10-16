export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[]

export interface Database {
    public: {
        Tables: {
            dashboard_data: {
                Row: {
                    id: number
                    created_at: string
                    category: string
                    value: number
                }
                Insert: {
                    id?: number
                    created_at?: string
                    category: string
                    value: number
                }
                Update: {
                    id?: number
                    created_at?: string
                    category?: string
                    value?: number
                }
            }
        }
    }
}