import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Euro, Image as ImageIcon, Layers, Plus, Save, Tag } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Services', href: '/services' },
    { title: 'Create', href: '/services/create' },
];

type FormField = {
    id: number;
    label: string;
    name: string;
    type: 'text' | 'textarea' | 'select';
    required: boolean;
    options?: string | null;
};

interface ServicesData {
    name: string;
    description: string;
    price: number;
    image: File | null;
    discount: number;
    discount_type: 'fixed' | 'percentage';
    discount_expires_at: string;
    form_fields: number[];
}

export default function CreateService({ form_fields }: { form_fields: FormField[] }) {
    const { data, setData, post, processing, errors, reset } = useForm<ServicesData>({
        name: '',
        description: '',
        price: 0,
        image: null,
        discount: 0,
        discount_type: 'fixed',
        discount_expires_at: '',
        form_fields: [],
    });

    function handleCheckBoxChanges(fieldId: number, checked: boolean) {
        if (checked) {
            setData('form_fields', [...(data.form_fields || []), fieldId]);
        } else {
            setData(
                'form_fields',
                (data.form_fields || []).filter((id) => id !== fieldId),
            );
        }
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('services.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Service" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">Create Service</h2>
                        <p className="text-sm text-muted-foreground">Add a new offering to your service catalog.</p>
                    </div>

                    <Link
                        href={route('services.index')}
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to services
                    </Link>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="flex items-center gap-2 border-b border-border pb-4">
                                <Layers className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold text-foreground">General Information</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Service Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g. Premium Web Hosting"
                                        className="bg-muted/30 focus:bg-background"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Detailed Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Describe what this service includes..."
                                        className="min-h-[120px] bg-muted/30 focus:bg-background"
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="space-y-2">
                                    <Label>Order Form Fields</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-between border-dashed bg-muted/30"
                                            >
                                                {data.form_fields.length > 0
                                                    ? `${data.form_fields.length} fields selected`
                                                    : 'Select custom fields for the order form'}
                                                <Plus className="h-4 w-4 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-80 space-y-2 p-3">
                                            {form_fields.map((field) => (
                                                <label
                                                    key={field.id}
                                                    className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={data.form_fields.includes(field.id)}
                                                        onChange={(e) =>
                                                            handleCheckBoxChanges(field.id, e.target.checked)
                                                        }
                                                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium">{field.label}</span>
                                                        <span className="text-[10px] uppercase text-muted-foreground">
                                                            {field.type}
                                                        </span>
                                                    </div>
                                                </label>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="flex items-center gap-2 border-b border-border pb-4">
                                <ImageIcon className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold text-foreground">Media Assets</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-12 transition-colors hover:bg-muted/20">
                                    {data.image ? (
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-foreground">{data.image.name}</p>
                                            <button
                                                type="button"
                                                onClick={() => setData('image', null)}
                                                className="mt-2 text-xs text-destructive hover:underline"
                                            >
                                                Remove image
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <ImageIcon className="mb-4 h-10 w-10 text-muted-foreground transition-colors group-hover:text-primary" />
                                            <p className="text-sm font-medium text-foreground">
                                                Click to upload service image
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                PNG, JPG or WebP (max 2MB)
                                            </p>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                        className="absolute inset-0 cursor-pointer opacity-0"
                                    />
                                </div>
                                <InputError message={errors.image} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Pricing */}
                    <div className="space-y-6">
                        <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="flex items-center gap-2 border-b border-border pb-4">
                                <Euro className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold text-foreground">Pricing & Discount</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Base Price</Label>
                                    <div className="relative">
                                        <Euro className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={(e) => setData('price', parseFloat(e.target.value))}
                                            className="bg-muted/30 pl-10 focus:bg-background"
                                        />
                                    </div>
                                    <InputError message={errors.price} />
                                </div>

                                <div className="space-y-2 border-t border-border pt-4">
                                    <div className="mb-2 flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-primary" />
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            Discount Policy
                                        </Label>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="discount_type" className="text-[10px]">
                                                Type
                                            </Label>
                                            <select
                                                id="discount_type"
                                                value={data.discount_type}
                                                onChange={(e) =>
                                                    setData('discount_type', e.target.value as 'fixed' | 'percentage')
                                                }
                                                className="w-full rounded-xl border border-border bg-muted/30 px-3 py-2 text-sm focus:ring-primary/20"
                                            >
                                                <option value="fixed">Fixed (€)</option>
                                                <option value="percentage">Percent (%)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="discount" className="text-[10px]">
                                                Amount
                                            </Label>
                                            <Input
                                                id="discount"
                                                type="number"
                                                value={data.discount}
                                                onChange={(e) => setData('discount', parseFloat(e.target.value))}
                                                className="bg-muted/30 focus:bg-background"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="discount_expires_at">Expires At</Label>
                                        <Input
                                            id="discount_expires_at"
                                            type="date"
                                            value={data.discount_expires_at}
                                            onChange={(e) => setData('discount_expires_at', e.target.value)}
                                            className="bg-muted/30 focus:bg-background"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-12 w-full gap-2 text-base shadow-lg shadow-primary/20"
                            >
                                <Save className="h-5 w-5" />
                                Create Service
                            </Button>
                            <Link href={route('services.index')} className="w-full">
                                <Button variant="ghost" className="w-full">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
