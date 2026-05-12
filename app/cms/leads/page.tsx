"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Mail, 
  Building2, 
  Calendar, 
  FileText, 
  Download,
  ArrowLeft,
  Search
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type { ResourceLead } from "@/lib/leads";

export default function LeadsCmsPage() {
  const [leads, setLeads] = useState<ResourceLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/leads");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to load leads");
      setLeads(data.leads);
    } catch (error) {
      console.error(error);
      toast.error("Could not load resource requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const filteredLeads = leads.filter(lead => 
    lead.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.resource_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(191,219,254,0.32),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_24%,#f8fafc_100%)] text-ink">
      <div className="custom-container py-12 md:py-14">
        
        {/* Navigation & Header */}
        <div className="mb-10">
          <Link 
            href="/cms/blogs" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Back to Blog CMS
          </Link>
          
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                Lead Management
              </p>
              <h1 className="text-[clamp(40px,6vw,64px)] font-black uppercase tracking-[-0.04em] leading-[0.92]">
                Resource Requests
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
                Monitor and manage users who have requested access to your whitepapers, guides, and strategic reports.
              </p>
            </div>
          </div>
        </div>

        {/* Stats & Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 w-full md:w-auto">
            <div className="border border-border bg-white px-6 py-4 shadow-sm flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-accent">
                <Users size={20} />
              </div>
              <div>
                <div className="text-2xl font-black">{leads.length}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink-muted">Total Leads</div>
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-white border border-border shadow-sm outline-none focus:border-accent transition-colors text-sm font-medium"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="bg-white border border-border shadow-[0_24px_64px_rgba(10,17,40,0.08)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-border">
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-ink-muted">User Details</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-ink-muted">Company</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-ink-muted">Resource Requested</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-ink-muted">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-ink-muted italic">
                      Loading your leads...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-ink-muted italic">
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-ink uppercase tracking-tight text-sm mb-0.5">{lead.full_name}</span>
                          <span className="text-xs text-ink-muted flex items-center gap-1.5 font-medium">
                            <Mail size={12} className="text-accent" />
                            {lead.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-medium text-ink-muted flex items-center gap-2">
                          <Building2 size={14} className="text-slate-300" />
                          {lead.company || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                          <FileText size={12} />
                          {lead.resource_title}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs text-ink-muted font-medium flex items-center gap-2">
                          <Calendar size={14} className="text-slate-300" />
                          {formatDate(lead.created_at)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
