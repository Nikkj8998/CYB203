import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2 } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" asChild className="flex-shrink-0 mt-1">
          <Link to="/admin/jobs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Job' : 'Create New Job'}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            {isEditing ? 'Update job details' : 'Add a new job posting'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Senior Full Stack Developer"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Remote / Hybrid / City Name"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Job Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Input
                  id="experience"
                  placeholder="e.g., 3-5 years"
                  value={formData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  placeholder="e.g., $80,000 - $120,000 or Competitive"
                  value={formData.salary}
                  onChange={(e) => handleChange('salary', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="e.g., Engineering, Sales, Marketing"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Brief overview of the role..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities">Key Responsibilities</Label>
              <Textarea
                id="responsibilities"
                placeholder="- Lead development of new features&#10;- Mentor junior developers&#10;- Participate in code reviews"
                value={formData.responsibilities}
                onChange={(e) => handleChange('responsibilities', e.target.value)}
                rows={6}
              />
              <p className="text-xs text-gray-500">Each responsibility on a new line, starting with - or •</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements & Qualifications</Label>
              <Textarea
                id="requirements"
                placeholder="- 5+ years experience with React&#10;- Strong TypeScript skills&#10;- Experience with REST APIs"
                value={formData.requirements}
                onChange={(e) => handleChange('requirements', e.target.value)}
                rows={6}
              />
              <p className="text-xs text-gray-500">Each requirement on a new line, starting with - or •</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Update Job' : 'Create Job'
            )}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link to="/admin/jobs">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};
