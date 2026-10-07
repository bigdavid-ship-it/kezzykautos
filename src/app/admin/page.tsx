import { Car, MessageSquare, Eye, TrendingUp, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch real stats
  const { count: vehicleCount } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact', head: true })

  const { count: inquiryCount } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'New')

  // Fetch recent inquiries
  const { data: recentInquiries } = await supabase
    .from('inquiries')
    .select(`
      *,
      vehicles (make, model, year)
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  // Fetch visitors
  const { data: settings } = await supabase
    .from('settings')
    .select('total_visitors')
    .eq('id', 1)
    .single()

  const stats = [
    { label: 'Total Vehicles', value: vehicleCount?.toString() || '0', icon: Car },
    { label: 'New Inquiries', value: inquiryCount?.toString() || '0', icon: MessageSquare },
    { label: 'Website Visitors', value: settings?.total_visitors?.toString() || '0', icon: Eye },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-display-sm font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">Overview of your dealership</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-bg-surface border border-border p-6 rounded-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-text-secondary text-body-sm font-medium">{stat.label}</p>
            <p className="text-display-md font-bold text-text-primary mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 bg-bg-surface border border-border rounded-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-subheading font-bold text-text-primary">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-body-sm font-medium text-accent hover:text-accent-hover flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentInquiries && recentInquiries.length > 0 ? (
              recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg bg-bg-elevated/30 hover:bg-bg-elevated/50 transition-colors gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-1">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-body font-medium text-text-primary">
                        {inquiry.name} 
                        {inquiry.vehicles && ` inquired about ${inquiry.vehicles.year} ${inquiry.vehicles.make} ${inquiry.vehicles.model}`}
                      </p>
                      <p className="text-body-sm text-text-muted mt-1">{formatDate(inquiry.created_at)}</p>
                    </div>
                  </div>
                  <Badge variant={inquiry.status === 'New' ? 'accent' : 'outline'} className="shrink-0">
                    {inquiry.status}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-text-muted border border-dashed border-border rounded-lg">
                No recent inquiries.
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-bg-surface border border-border rounded-card p-6 h-fit">
          <h2 className="text-subheading font-bold text-text-primary mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/vehicles/add" className="w-full flex items-center justify-between p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all group">
              <span className="text-body-sm font-medium text-text-primary group-hover:text-accent transition-colors">Add New Vehicle</span>
              <Car className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
            </Link>
            <Link href="/admin/inquiries" className="w-full flex items-center justify-between p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all group">
              <span className="text-body-sm font-medium text-text-primary group-hover:text-accent transition-colors">View All Inquiries</span>
              <MessageSquare className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
