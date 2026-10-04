import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { Mail, Phone, Car } from 'lucide-react'

export const metadata = {
  title: 'Inquiries | Kezzyk Autos Admin',
}

export default async function AdminInquiriesPage() {
  const supabase = await createClient()
  
  const { data: inquiries, error } = await supabase
    .from('inquiries')
    .select(`
      *,
      vehicles (make, model, year)
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display-sm font-bold text-text-primary">Inquiries</h1>
        <p className="text-text-secondary mt-1">Manage customer contacts and leads</p>
      </div>

      <div className="bg-bg-surface border border-border rounded-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-bg-elevated/50">
                <th className="p-4 text-body-sm font-medium text-text-secondary">Customer</th>
                <th className="p-4 text-body-sm font-medium text-text-secondary">Type & Vehicle</th>
                <th className="p-4 text-body-sm font-medium text-text-secondary">Status</th>
                <th className="p-4 text-body-sm font-medium text-text-secondary">Date</th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-status-error">
                    Failed to load inquiries. Error: {error.message}
                  </td>
                </tr>
              ) : inquiries?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-text-muted">
                    No inquiries found.
                  </td>
                </tr>
              ) : (
                inquiries?.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-border hover:bg-bg-elevated/30 transition-colors">
                    <td className="p-4 align-top">
                      <div className="font-medium text-text-primary mb-1">{inquiry.name}</div>
                      <div className="flex flex-col gap-1 text-caption text-text-secondary">
                        <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {inquiry.email}</span>
                        <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {inquiry.phone}</span>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <Badge variant={inquiry.type === 'Vehicle Inquiry' ? 'accent' : 'outline'} className="mb-2">
                        {inquiry.type}
                      </Badge>
                      {inquiry.vehicles && (
                        <div className="flex items-center gap-1.5 text-body-sm text-text-secondary">
                          <Car className="w-4 h-4" />
                          {inquiry.vehicles.year} {inquiry.vehicles.make} {inquiry.vehicles.model}
                        </div>
                      )}
                      <div className="mt-3 text-body-sm text-text-secondary max-w-sm line-clamp-2">
                        "{inquiry.message}"
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <Badge variant={
                        inquiry.status === 'New' ? 'accent' :
                        inquiry.status === 'Contacted' ? 'outline' :
                        inquiry.status === 'Resolved' ? 'success' : 'default'
                      }>
                        {inquiry.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-body-sm text-text-secondary align-top">
                      {formatDate(inquiry.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
