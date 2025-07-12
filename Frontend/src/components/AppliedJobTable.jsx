import React from 'react'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import { Calendar, Building, Eye, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    
    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'accepted':
                return 'bg-green-100 text-green-800 hover:bg-green-200'
            case 'rejected':
                return 'bg-red-100 text-red-800 hover:bg-red-200'
            case 'pending':
            default:
                return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
        }
    }
    
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }
    
    if (!allAppliedJobs || allAppliedJobs.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Yet</h3>
                <p className="text-gray-500 mb-6">You haven't applied to any jobs yet. Start exploring opportunities!</p>
                <Link to="/jobs">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        Browse Jobs
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-gray-900">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Date Applied
                            </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Job Role
                            </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                            <div className="flex items-center gap-2">
                                <Building className="w-4 h-4" />
                                Company
                            </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">Status</TableHead>
                        <TableHead className="font-semibold text-gray-900">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.map((appliedJob) => (
                        <TableRow key={appliedJob._id} className="hover:bg-gray-50 transition-colors">
                            <TableCell className="text-gray-600">
                                {formatDate(appliedJob?.createdAt)}
                            </TableCell>
                            <TableCell>
                                <div className="font-medium text-gray-900">
                                    {appliedJob.job?.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {appliedJob.job?.location}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium text-gray-900">
                                    {appliedJob.job?.company?.name}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge 
                                    variant="secondary" 
                                    className={`${getStatusColor(appliedJob?.status)} font-medium`}
                                >
                                    {appliedJob.status?.toUpperCase()}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Link to={`/description/${appliedJob.job?._id}`}>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        className="flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                                    >
                                        <Eye className="w-3 h-3" />
                                        View
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable;
