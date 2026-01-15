"use client";

import { useEffect, useState } from 'react';
import { projectService } from '@/data/services/projectService';
import { blogService } from '@/data/services/blogService';
import { achievementService } from '@/data/services/achievementService';
import { experienceService } from '@/data/services/experienceService';
import { educationService } from '@/data/services/educationService';
import { skillService } from '@/data/services/skillService';
import { researchService } from '@/data/services/researchService';
import { contactService } from '@/data/services/contactService';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Layout, FileText, Award, Briefcase, GraduationCap, Code, BookOpen, User, Link as LinkIcon, Plus, Trash2, Save, RefreshCw, Database, Lock } from 'lucide-react';

import { checkSession, verifyPassword } from './actions';

export default function AdminPage() {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [passwordInput, setPasswordInput] = useState('');
    const [authError, setAuthError] = useState('');

    // Admin Panel State
    const [activeTab, setActiveTab] = useState('projects');
    const [dataList, setDataList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Profile specific state
    const [profileData, setProfileData] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        const isAuth = await checkSession();
        setIsAuthenticated(isAuth);
        setAuthLoading(false);
        if (isAuth) loadData();
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setAuthLoading(true);
        const res = await verifyPassword(passwordInput);
        if (res.success) {
            setIsAuthenticated(true);
            loadData();
        } else {
            setAuthError(res.error || 'Invalid password');
        }
        setAuthLoading(false);
    }

    useEffect(() => {
        if (isAuthenticated) loadData();
    }, [activeTab, isAuthenticated]);

    async function loadData() {
        if (!isAuthenticated) return;
        setLoading(true);
        try {
            setDataList([]);
            setProfileData(null);

            switch (activeTab) {
                case 'projects': setDataList(await projectService.getAll()); break;
                case 'blogs': setDataList(await blogService.getAll()); break;
                case 'achievements': setDataList(await achievementService.getAll()); break;
                case 'experience': setDataList(await experienceService.getAll()); break;
                case 'education': setDataList(await educationService.getAll()); break;
                case 'skills': setDataList(await skillService.getAll()); break;
                case 'research': setDataList(await researchService.getAll()); break;
                case 'social_links': setDataList(await contactService.getLinks()); break;
                case 'profile': setProfileData(await contactService.getProfile()); setFormData(await contactService.getProfile() || {}); break;
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    // ... (Keep existing CRUD functions: handleSeed, handleCreate, handleEdit, handleSave, handleDelete)

    async function handleSeed() {
        if (confirm(`Seed ${activeTab}? This may duplicate data.`)) {
            setLoading(true);
            try {
                if (activeTab === 'projects') await projectService.seed();
                if (activeTab === 'blogs') await blogService.seed();
                if (activeTab === 'achievements') await achievementService.seed();
                if (activeTab === 'experience') await experienceService.seed();
                if (activeTab === 'education') await educationService.seed();
                if (activeTab === 'skills') await skillService.seed();
                if (activeTab === 'research') await researchService.seed();
                if (activeTab === 'social_links' || activeTab === 'profile') await contactService.seed();

                await loadData();
                alert('Seeding complete');
            } catch (e) {
                console.error(e);
                alert('Error seeding');
            } finally {
                setLoading(false);
            }
        }
    }

    function handleCreate() {
        setSelectedItem(null);
        let initialData = {};
        if (activeTab === 'projects') initialData = { id: '', title: '', type: 'Web Application', description: '', tech: '', link: '', category: 'Real Life Projects' };
        if (activeTab === 'blogs') initialData = { id: '', title: '', description: '', link: '', platform: 'Dev.to', date: new Date().toLocaleDateString() };
        if (activeTab === 'achievements') initialData = { title: '', description: '', link: '' };
        if (activeTab === 'experience') initialData = { company: '', role: '', period: '', points: [] };
        if (activeTab === 'education') initialData = { institution: '', degree: '', field: '', period: '', location: '' };
        if (activeTab === 'skills') initialData = { title: '', skills: [] };
        if (activeTab === 'research') initialData = { title: '', subtitle: '', description: '' };
        if (activeTab === 'social_links') initialData = { id: '', label: '', value: '', href: '', icon: '' };

        setFormData(initialData);
        setIsEditing(true);
    }

    function handleEdit(item: any) {
        setSelectedItem(item);
        setFormData(item);
        setIsEditing(true);
    }

    async function handleSave() {
        setLoading(true);
        try {
            if (activeTab === 'profile') {
                await contactService.updateProfile(formData);
            } else {
                const serviceMap: any = {
                    projects: projectService,
                    blogs: blogService,
                    achievements: achievementService,
                    experience: experienceService,
                    education: educationService,
                    skills: skillService,
                    research: researchService
                };

                if (activeTab === 'social_links') {
                    if (selectedItem) await contactService.updateLink(selectedItem.id, formData);
                    else await contactService.createLink(formData);
                } else {
                    const service = serviceMap[activeTab];
                    if (service) {
                        if (selectedItem) await service.update(selectedItem.id, formData);
                        else await service.create(formData);
                    }
                }
            }
            setIsEditing(false);
            await loadData();
        } catch (e) {
            console.error(e);
            alert('Failed to save');
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete item?')) return;
        setLoading(true);
        try {
            if (activeTab === 'projects') await projectService.delete(id);
            if (activeTab === 'blogs') await blogService.delete(id);
            if (activeTab === 'achievements') await achievementService.delete(id);
            if (activeTab === 'experience') await experienceService.delete(id);
            if (activeTab === 'education') await educationService.delete(id);
            if (activeTab === 'skills') await skillService.delete(id);
            if (activeTab === 'research') await researchService.delete(id);
            if (activeTab === 'social_links') await contactService.deleteLink(id);
            await loadData();
        } catch (e) {
            console.error(e);
            alert('Failed to delete');
        } finally {
            setLoading(false);
        }
    }

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <RefreshCw className="animate-spin h-8 w-8 text-blue-600" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-center flex flex-col items-center gap-2">
                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Lock className="h-6 w-6 text-blue-600" />
                            </div>
                            <span>Admin Login</span>
                        </CardTitle>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Password</label>
                                <Input
                                    type="password"
                                    value={passwordInput}
                                    onChange={e => setPasswordInput(e.target.value)}
                                    placeholder="Enter admin password"
                                    className={authError ? 'border-red-500' : ''}
                                />
                                {authError && <p className="text-xs text-red-500">{authError}</p>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                                Login to Admin Panel
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
                <div className="p-6 border-b border-gray-100 shrink-0">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Admin Panel
                    </h1>
                </div>
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {[
                        { id: 'projects', icon: Layout, label: 'Projects' },
                        { id: 'blogs', icon: FileText, label: 'Blogs' },
                        { id: 'achievements', icon: Award, label: 'Achievements' },
                        { id: 'experience', icon: Briefcase, label: 'Experience' },
                        { id: 'education', icon: GraduationCap, label: 'Education' },
                        { id: 'skills', icon: Code, label: 'Skills' },
                        { id: 'research', icon: BookOpen, label: 'Research' },
                        { id: 'profile', icon: User, label: 'Profile Info' },
                        { id: 'social_links', icon: LinkIcon, label: 'Social Links' },
                    ].map(tab => (
                        <Button
                            key={tab.id}
                            variant={activeTab === tab.id ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => { setActiveTab(tab.id); setIsEditing(false); }}
                        >
                            <tab.icon className="mr-2 h-4 w-4" />
                            {tab.label}
                        </Button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100 shrink-0">
                    <Button variant="outline" className="w-full" onClick={handleSeed}>
                        <Database className="mr-2 h-4 w-4" />
                        Seed Data
                    </Button>
                </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    {/* Special Case: Profile Tab is always an edit form */}
                    {(activeTab === 'profile') && (
                        <Card>
                            <CardHeader><CardTitle>Profile Information</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone</label>
                                    <Input value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Address</label>
                                    <Input value={formData.address || ''} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                </div>
                                <Button onClick={handleSave} className="mt-4"><Save className="mr-2 h-4 w-4" /> Save Profile</Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* List / Edit View for other tabs */}
                    {(activeTab !== 'profile') && (
                        <>
                            {isEditing ? (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{selectedItem ? 'Edit Item' : 'New Item'}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Generic ID field if applicable */}
                                        {['projects', 'blogs', 'social_links'].includes(activeTab) && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">ID</label>
                                                <Input value={formData.id} onChange={e => setFormData({ ...formData, id: e.target.value })} disabled={!!selectedItem} />
                                            </div>
                                        )}

                                        {/* Generic Title field */}
                                        {['projects', 'blogs', 'achievements', 'skills', 'research'].includes(activeTab) && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Title</label>
                                                <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                            </div>
                                        )}

                                        {/* Experience/Education specific fields */}
                                        {activeTab === 'experience' && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Company</label>
                                                    <Input value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Role</label>
                                                    <Input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                                                </div>
                                            </>
                                        )}
                                        {activeTab === 'education' && (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Institution</label>
                                                    <Input value={formData.institution} onChange={e => setFormData({ ...formData, institution: e.target.value })} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Degree</label>
                                                    <Input value={formData.degree} onChange={e => setFormData({ ...formData, degree: e.target.value })} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Field</label>
                                                    <Input value={formData.field} onChange={e => setFormData({ ...formData, field: e.target.value })} />
                                                </div>
                                            </>
                                        )}

                                        {/* Period/Date fields */}
                                        {['experience', 'education'].includes(activeTab) && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Period</label>
                                                <Input value={formData.period} onChange={e => setFormData({ ...formData, period: e.target.value })} />
                                            </div>
                                        )}
                                        {activeTab === 'blogs' && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Date</label>
                                                <Input value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                                            </div>
                                        )}

                                        {/* Description (Textarea) */}
                                        {['projects', 'blogs', 'achievements', 'research'].includes(activeTab) && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Description</label>
                                                <textarea className="w-full min-h-[100px] rounded-md border p-2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                            </div>
                                        )}

                                        {/* Array Inputs (Newline separated) */}
                                        {activeTab === 'experience' && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Points (One per line)</label>
                                                <textarea className="w-full min-h-[150px] rounded-md border p-2"
                                                    value={Array.isArray(formData.points) ? formData.points.join('\n') : formData.points}
                                                    onChange={e => setFormData({ ...formData, points: e.target.value.split('\n') })}
                                                />
                                            </div>
                                        )}
                                        {activeTab === 'skills' && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Skills (One per line)</label>
                                                <textarea className="w-full min-h-[150px] rounded-md border p-2"
                                                    value={Array.isArray(formData.skills) ? formData.skills.join('\n') : formData.skills}
                                                    onChange={e => setFormData({ ...formData, skills: e.target.value.split('\n') })}
                                                />
                                            </div>
                                        )}

                                        {/* Other specific fields */}
                                        {activeTab === 'projects' && (
                                            <>
                                                <Input placeholder="Type" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} />
                                                <Input placeholder="Tech Stack" value={formData.tech} onChange={e => setFormData({ ...formData, tech: e.target.value })} />
                                                <select className="border rounded p-1 w-full" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                                    <option value="Real Life Projects">Real Life Projects</option>
                                                    <option value="Hobby Projects">Hobby Projects</option>
                                                    <option value="Landing Pages">Landing Pages</option>
                                                </select>
                                            </>
                                        )}
                                        {activeTab === 'research' && (
                                            <Input placeholder="Subtitle" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} />
                                        )}
                                        {activeTab === 'education' && (
                                            <>
                                                <Input placeholder="CGPA" value={formData.cgpa} onChange={e => setFormData({ ...formData, cgpa: e.target.value })} />
                                                <Input placeholder="Location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                                            </>
                                        )}
                                        {activeTab === 'social_links' && (
                                            <>
                                                <Input placeholder="Label" value={formData.label} onChange={e => setFormData({ ...formData, label: e.target.value })} />
                                                <Input placeholder="Value (Display text)" value={formData.value} onChange={e => setFormData({ ...formData, value: e.target.value })} />
                                                <Input placeholder="Icon Code (e.g. GH, IN, YT)" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                                            </>
                                        )}

                                        {['projects', 'blogs', 'social_links', 'achievements'].includes(activeTab) && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Link / URL</label>
                                                <Input value={formData.link || formData.href} onChange={e => setFormData({ ...formData, [activeTab === 'social_links' ? 'href' : 'link']: e.target.value })} />
                                            </div>
                                        )}

                                        <div className="flex justify-end gap-2 pt-4">
                                            <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                                            <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold tracking-tight capitalize">{activeTab.replace('_', ' ')}</h2>
                                        <Button onClick={handleCreate}><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
                                    </div>
                                    {loading ? <div className="flex justify-center p-12"><RefreshCw className="animate-spin" /></div> : (
                                        <div className="grid gap-4">
                                            {dataList.length === 0 && <div className="p-8 text-center border-dashed border rounded bg-white text-gray-500">No items found.</div>}
                                            {dataList.map((item: any) => (
                                                <Card key={item.id} className="hover:shadow-md transition-shadow">
                                                    <CardContent className="p-4 flex items-center justify-between">
                                                        <div className="space-y-1">
                                                            <h3 className="font-semibold text-lg">
                                                                {item.title || item.company || item.institution || item.label || 'Untitled'}
                                                            </h3>
                                                            <p className="text-xs text-muted-foreground flex gap-2">
                                                                {item.role && <span>{item.role}</span>}
                                                                {item.degree && <span>{item.degree}</span>}
                                                                {item.period && <span>{item.period}</span>}
                                                                {item.skills && <span>{item.skills.length} skills</span>}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
                                                            <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
