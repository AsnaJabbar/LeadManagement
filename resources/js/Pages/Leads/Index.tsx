import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Lead, PageProps } from '@/types';
import { useState, useEffect, FormEvent } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

interface Props extends Record<string, unknown> {
    auth: PageProps['auth'];
    leads: {
        data: Lead[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        search: string;
        status: string;
        sort: string;
    };
    statusOptions: string[];
    flash: {
        success?: string;
        error?: string;
    };
}

export default function Index({ auth, leads, filters, statusOptions }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [sort, setSort] = useState(filters.sort || 'desc');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentLead, setCurrentLead] = useState<Lead | null>(null);

    const createForm = useForm({
        name: '',
        email: '',
        phone: '',
        status: 'New' as Lead['status'],
    });

    const editForm = useForm({
        name: '',
        email: '',
        phone: '',
        status: 'New' as Lead['status'],
    });

    // Handle session-based filtering
    const applyFilters = () => {
        // @ts-ignore
        router.post(route('leads.filter'), {
            search,
            status,
            sort,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    // Auto-apply filters when status or sort changes
    useEffect(() => {
        if (!isCreateModalOpen && !isEditModalOpen && (status !== filters.status || sort !== filters.sort)) {
            applyFilters();
        }
    }, [status, sort, isCreateModalOpen, isEditModalOpen]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const openCreateModal = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        createForm.reset();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (lead: Lead, e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentLead(lead);
        const typedLeadStatus = lead.status as Lead['status'];
        editForm.setData({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            status: typedLeadStatus,
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (lead: Lead, e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentLead(lead);
        setIsDeleteModalOpen(true);
    };

    const submitCreate = (e: FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        createForm.post(route('leads.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
            },
        });
    };

    const submitEdit = (e: FormEvent) => {
        e.preventDefault();
        if (currentLead) {
            // @ts-ignore
            editForm.put(route('leads.update', currentLead.id), {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                    setCurrentLead(null);
                },
            });
        }
    };

    const confirmDelete = () => {
        if (currentLead) {
            router.delete(route('leads.destroy', currentLead.id), {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setCurrentLead(null);
                },
            });
        }
    };

    const toggleStatus = (lead: Lead) => {
        const statuses: Lead['status'][] = ['New', 'Contacted', 'Converted'];
        const currentIndex = statuses.indexOf(lead.status as Lead['status']);
        const nextIndex = (currentIndex + 1) % statuses.length;
        const nextStatus = statuses[nextIndex];

        // @ts-ignore
        router.put(route('leads.update', lead.id), {
            ...lead,
            status: nextStatus,
        }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Lead Management
                </h2>
            }
        >
            <Head title="Leads" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Toolbar */}
                            <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
                                <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
                                    <TextInput
                                        className="w-full text-black dark:text-white"
                                        placeholder="Search by name or email..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <PrimaryButton type="submit">Search</PrimaryButton>
                                </form>

                                <div className="flex flex-wrap items-center gap-4">
                                    <SelectInput
                                        className="w-40"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="">All Statuses</option>
                                        {statusOptions.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </SelectInput>

                                    <SelectInput
                                        className="w-40"
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                    >
                                        <option value="desc">Newest First</option>
                                        <option value="asc">Oldest First</option>
                                    </SelectInput>

                                    <PrimaryButton type="button" onClick={(e) => openCreateModal(e)}>
                                        Add Lead
                                    </PrimaryButton>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th className="px-6 py-3">Name</th>
                                            <th className="px-6 py-3">Email</th>
                                            <th className="px-6 py-3">Phone</th>
                                            <th className="px-6 py-3 text-center">Status</th>
                                            <th className="px-6 py-3">Created At</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {leads.data.map((lead) => (
                                            <tr key={lead.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{lead.name}</td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{lead.email}</td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{lead.phone}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => toggleStatus(lead)}
                                                        title="Click to change status"
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition transform hover:scale-105 active:scale-95 ${lead.status === 'Converted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                                            lead.status === 'Contacted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                            }`}
                                                    >
                                                        {lead.status}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                    {new Date(lead.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={(e) => openEditModal(lead, e)}
                                                        className="mr-3 font-medium text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={(e) => openDeleteModal(lead, e)}
                                                        className="font-medium text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {leads.data.length === 0 && (
                                    <div className="py-10 text-center text-gray-500">
                                        No leads found.
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex flex-wrap justify-center gap-1">
                                {leads.links.map((link, i) => (
                                    <button
                                        key={i}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url)}
                                        className={`px-3 py-1 rounded border text-sm transition ${link.active
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <form onSubmit={submitCreate} className="p-6" onClick={(e) => e.stopPropagation()}>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-b pb-4 mb-6">
                        Add New Lead
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="create-name" value="Name" />
                            <TextInput
                                id="create-name"
                                className="block w-full mt-1"
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData('name', e.target.value)}
                                required
                            />
                            <InputError message={createForm.errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="create-email" value="Email" />
                            <TextInput
                                id="create-email"
                                type="email"
                                className="block w-full mt-1"
                                value={createForm.data.email}
                                onChange={(e) => createForm.setData('email', e.target.value)}
                                required
                            />
                            <InputError message={createForm.errors.email} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="create-phone" value="Phone" />
                            <TextInput
                                id="create-phone"
                                className="block w-full mt-1"
                                value={createForm.data.phone}
                                onChange={(e) => createForm.setData('phone', e.target.value)}
                                required
                            />
                            <InputError message={createForm.errors.phone} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="create-status" value="Status" />
                            <SelectInput
                                id="create-status"
                                className="block w-full mt-1"
                                value={createForm.data.status}
                                onChange={(e) => createForm.setData('status', e.target.value as any)}
                            >
                                {statusOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={createForm.errors.status} className="mt-2" />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3 pt-4 border-t">
                        <SecondaryButton onClick={() => setIsCreateModalOpen(false)}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton disabled={createForm.processing}>
                            Create Lead
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <form onSubmit={submitEdit} className="p-6" onClick={(e) => e.stopPropagation()}>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-b pb-4 mb-6">
                        Edit Lead
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="edit-name" value="Name" />
                            <TextInput
                                id="edit-name"
                                className="block w-full mt-1"
                                value={editForm.data.name}
                                onChange={(e) => editForm.setData('name', e.target.value)}
                                required
                            />
                            <InputError message={editForm.errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit-email" value="Email" />
                            <TextInput
                                id="edit-email"
                                type="email"
                                className="block w-full mt-1"
                                value={editForm.data.email}
                                onChange={(e) => editForm.setData('email', e.target.value)}
                                required
                            />
                            <InputError message={editForm.errors.email} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit-phone" value="Phone" />
                            <TextInput
                                id="edit-phone"
                                className="block w-full mt-1"
                                value={editForm.data.phone}
                                onChange={(e) => editForm.setData('phone', e.target.value)}
                                required
                            />
                            <InputError message={editForm.errors.phone} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit-status" value="Status" />
                            <SelectInput
                                id="edit-status"
                                className="block w-full mt-1"
                                value={editForm.data.status}
                                onChange={(e) => editForm.setData('status', e.target.value as any)}
                            >
                                {statusOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </SelectInput>
                            <InputError message={editForm.errors.status} className="mt-2" />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3 pt-4 border-t">
                        <SecondaryButton onClick={() => setIsEditModalOpen(false)}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton disabled={editForm.processing}>
                            Update Lead
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Are you sure?
                    </h2>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Confirm that you want to delete lead: <strong className="text-gray-900 dark:text-gray-200">{currentLead?.name}</strong>. This action cannot be undone.
                    </p>
                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton onClick={confirmDelete} disabled={editForm.processing}>
                            Delete Lead
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
