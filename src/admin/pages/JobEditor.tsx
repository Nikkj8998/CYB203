import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, Save, X, Briefcase, MapPin, Clock, DollarSign, Building2, AlignLeft, ListChecks, Activity } from 'lucide-react';
import { toast } from 'sonner';

interface JobForm {
  title: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  department: string;
  description: string;
  requirements: string;
  responsibilities: string;
  status: string;
}

export const JobEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<JobForm>({
    title: '',
    location: '',
    type: 'Full-time',
    experience: '',
    salary: '',
    department: '',
    description: '',
    requirements: '',
    responsibilities: '',
    status: 'active'
  });

  useEffect(() => {
    if (isEditing) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await api.jobs.getById(parseInt(id!));
      if (response.success && response.data) {
        setFormData({
          title: response.data.title || '',
          location: response.data.location || '',
          type: response.data.type || 'Full-time',
          experience: response.data.experience || '',
          salary: response.data.salary || '',
          department: response.data.department || '',
          description: response.data.description || '',
          requirements: response.data.requirements || '',
          responsibilities: response.data.responsibilities || '',
          status: response.data.status || 'active'
        });
      } else {
        toast.error('Job not found');
        navigate('/admin/jobs');
      }
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error('Failed to load job');
      navigate('/admin/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      
      if (isEditing) {
        const response = await api.jobs.update(parseInt(id!), formData);
        if (response.success) {
          toast.success('Job updated successfully!');
          navigate('/admin/jobs');
        } else {
          toast.error(response.message || 'Failed to update job');
        }
      } else {
        const response = await api.jobs.create(formData);
        if (response.success) {
          toast.success('Job created successfully!');
          navigate('/admin/jobs');
        } else {
          toast.error(response.message || 'Failed to create job');
        }
      }
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('An error occurred while saving the job');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: keyof JobForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="rounded-full">
            <Link to="/admin/jobs">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Job Posting' : 'Create New Job'}
            </h1>
            <p className="text-gray-500">
              {isEditing ? `Update details for ${formData.title}` : 'Fill in the information to post a new opening'}
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/admin/jobs">
              <X className="h-4 w-4 mr-2" /> Cancel
            </Link>
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isEditing ? 'Update Job' : 'Create Job'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm ring-1 ring-gray-200">
              <CardHeader className="border-b bg-gray-50/50 py-4">
                <div className="flex items-center gap-2 font-semibold text-gray-900">
                  <AlignLeft className="h-4 w-4 text-blue-600" />
                  Primary Details
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Job Title <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="title"
                      placeholder="e.g., Senior Full Stack Developer"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Job Description <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a brief overview of the role and its impact..."
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="min-h-[150px] resize-none focus-visible:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <ListChecks className="h-4 w-4 text-blue-600" />
                    Key Responsibilities
                  </Label>
                  <Textarea
                    id="responsibilities"
                    placeholder="• Lead development of new features&#10;• Mentor junior developers&#10;• Participate in code reviews"
                    value={formData.responsibilities}
                    onChange={(e) => handleChange('responsibilities', e.target.value)}
                    className="min-h-[120px] resize-none focus-visible:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 italic">Tip: Use bullets (•) for each point on a new line.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <AlignLeft className="h-4 w-4 text-blue-600" />
                    Requirements & Qualifications
                  </Label>
                  <Textarea
                    id="requirements"
                    placeholder="• 5+ years experience with React&#10;• Strong TypeScript skills&#10;• Experience with REST APIs"
                    value={formData.requirements}
                    onChange={(e) => handleChange('requirements', e.target.value)}
                    className="min-h-[120px] resize-none focus-visible:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm ring-1 ring-gray-200">
              <CardHeader className="border-b bg-gray-50/50 py-4">
                <div className="flex items-center gap-2 font-semibold text-gray-900">
                  <Activity className="h-4 w-4 text-blue-600" />
                  Job Parameters
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xs uppercase tracking-wider text-gray-500 font-bold">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="e.g., Remote / Hyderabad"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className="pl-9 h-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-xs uppercase tracking-wider text-gray-500 font-bold">Job Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                    <SelectTrigger className="h-10">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <SelectValue placeholder="Select type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-xs uppercase tracking-wider text-gray-500 font-bold">Department</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="department"
                      placeholder="e.g., Engineering"
                      value={formData.department}
                      onChange={(e) => handleChange('department', e.target.value)}
                      className="pl-9 h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary" className="text-xs uppercase tracking-wider text-gray-500 font-bold">Compensation</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="salary"
                      placeholder="e.g., ₹12 - ₹18 LPA"
                      value={formData.salary}
                      onChange={(e) => handleChange('salary', e.target.value)}
                      className="pl-9 h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-xs uppercase tracking-wider text-gray-500 font-bold">Experience Level</Label>
                  <Input
                    id="experience"
                    placeholder="e.g., 3-5 years"
                    value={formData.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-xs uppercase tracking-wider text-gray-500 font-bold">Visibility Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active (Visible)</SelectItem>
                      <SelectItem value="inactive">Inactive (Hidden)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3 sm:hidden">
              <Button onClick={handleSubmit} className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                {isEditing ? 'Update Job' : 'Create Job'}
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/admin/jobs">Cancel</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
