import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, RefreshCw, Save, ShoppingBag, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Orders', href: '/orders' },
    { title: 'Edit Order', href: '#' },
];

type ProgressStep = {
    id?: number;
    label: string;
    percentage: number;
    note: string;
};

type Order = {
    id: number;
    status: string;
    service?: { name: string };
    progress: ProgressStep[];
};

const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_COLORS: Record<string, string> = {
    pending: '#f59e0b',
    processing: '#3b82f6',
    completed: '#10b981',
    cancelled: '#ef4444',
};

export default function Edit({ order }: { order: Order }) {
    const { data, setData, put, processing, errors } = useForm({
        status: order.status,
        progress: (order.progress ?? []).map((p) => ({
            id: p.id,
            label: p.label,
            percentage: p.percentage,
            note: p.note ?? '',
        })),
    });

    const totalProgress = Math.min(
        data.progress.reduce((sum, s) => sum + Number(s.percentage || 0), 0),
        100,
    );

    function addStep() {
        setData('progress', [...data.progress, { id: undefined, label: '', percentage: 0, note: '' }]);
    }

    function removeStep(index: number) {
        setData(
            'progress',
            data.progress.filter((_, i) => i !== index),
        );
    }

    function updateStep(index: number, field: keyof ProgressStep, value: string | number) {
        const updated = [...data.progress];
        (updated[index] as Record<string, string | number | undefined>)[field] = value;
        setData('progress', updated);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('orders.update', order.id));
    }

    const statusColor = STATUS_COLORS[data.status] ?? '#6b7280';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Order #${order.id}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-black uppercase tracking-widest text-primary">Admin Panel</p>
                        <h1 className="font-display text-3xl font-black tracking-tight text-foreground">
                            Edit Order <span className="text-primary">#{order.id}</span>
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Managing project for{' '}
                            <span className="font-semibold text-foreground">{order.service?.name ?? 'N/A'}</span>
                        </p>
                    </div>
                    <Link
                        href={route('orders.index')}
                        className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to orders
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left column: Status + Progress bar summary */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* Order card */}
                        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                            <div className="flex items-center gap-4 border-b border-border bg-muted/10 p-5">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <ShoppingBag className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Order</p>
                                    <p className="text-sm font-bold text-foreground">ORD-{order.id}</p>
                                </div>
                            </div>

                            <div className="p-5 space-y-4">
                                {/* Status selector */}
                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                                        Fulfillment Status
                                    </Label>
                                    <div className="relative">
                                        <RefreshCw className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full appearance-none rounded-xl border border-border bg-muted/30 py-2.5 pl-10 pr-4 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            style={{ borderColor: statusColor + '55', color: statusColor }}
                                        >
                                            {STATUS_OPTIONS.map((o) => (
                                                <option key={o.value} value={o.value}>
                                                    {o.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <InputError message={errors.status} />
                                </div>

                                {/* Progress summary */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                                            Total Progress
                                        </Label>
                                        <span
                                            className="text-lg font-black tabular-nums"
                                            style={{ color: totalProgress === 100 ? '#10b981' : '#3b82f6' }}
                                        >
                                            {totalProgress}%
                                        </span>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="h-3 w-full overflow-hidden rounded-full bg-muted/50">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${totalProgress}%`,
                                                background:
                                                    totalProgress === 100
                                                        ? 'linear-gradient(90deg, #10b981, #059669)'
                                                        : 'linear-gradient(90deg, #3b82f6, #6366f1)',
                                            }}
                                        />
                                    </div>
                                    {totalProgress > 100 && (
                                        <p className="text-xs font-semibold text-destructive">⚠ Total exceeds 100%</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Save button */}
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full gap-2 rounded-xl shadow-lg shadow-primary/10"
                        >
                            <Save className="h-4 w-4" />
                            {processing ? 'Saving…' : 'Save Changes'}
                        </Button>
                        <Link href={route('orders.index')} className="block">
                            <Button type="button" variant="ghost" className="w-full rounded-xl">
                                Cancel
                            </Button>
                        </Link>
                    </div>

                    {/* Right column: Progress steps */}
                    <div className="space-y-4 lg:col-span-2">
                        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                            <div className="flex items-center justify-between border-b border-border bg-muted/10 p-5">
                                <div>
                                    <h2 className="text-sm font-black uppercase tracking-wider text-foreground">
                                        Project Progress Steps
                                    </h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Add steps like "Design → 20%", "Development → 50%", etc.
                                    </p>
                                </div>
                                <Button type="button" onClick={addStep} size="sm" variant="outline" className="gap-1.5 rounded-xl">
                                    <Plus className="h-4 w-4" />
                                    Add Step
                                </Button>
                            </div>

                            <div className="p-5 space-y-3">
                                {data.progress.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-14 text-center">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/30 text-muted-foreground">
                                            <RefreshCw className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm font-semibold text-muted-foreground">No progress steps yet</p>
                                        <p className="text-xs text-muted-foreground/60 mt-1">
                                            Click "Add Step" to create the first milestone.
                                        </p>
                                    </div>
                                ) : (
                                    data.progress.map((step, index) => (
                                        <div
                                            key={index}
                                            className="group relative overflow-hidden rounded-xl border border-border bg-muted/20 p-4 transition-colors hover:bg-muted/30"
                                        >
                                            {/* Step number badge */}
                                            <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-black text-primary">
                                                {index + 1}
                                            </span>

                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_120px]">
                                                {/* Label */}
                                                <div className="space-y-1.5">
                                                    <Label
                                                        htmlFor={`step-label-${index}`}
                                                        className="text-[10px] font-black uppercase tracking-wider text-muted-foreground"
                                                    >
                                                        Step Name
                                                    </Label>
                                                    <Input
                                                        id={`step-label-${index}`}
                                                        value={step.label}
                                                        onChange={(e) => updateStep(index, 'label', e.target.value)}
                                                        placeholder="e.g. Design, Development, Testing…"
                                                        className="rounded-xl"
                                                    />
                                                    <InputError message={(errors as Record<string, string>)[`progress.${index}.label`]} />
                                                </div>

                                                {/* Percentage */}
                                                <div className="space-y-1.5">
                                                    <Label
                                                        htmlFor={`step-pct-${index}`}
                                                        className="text-[10px] font-black uppercase tracking-wider text-muted-foreground"
                                                    >
                                                        % Share
                                                    </Label>
                                                    <Input
                                                        id={`step-pct-${index}`}
                                                        type="number"
                                                        min={0}
                                                        max={100}
                                                        value={step.percentage}
                                                        onChange={(e) => updateStep(index, 'percentage', Number(e.target.value))}
                                                        className="rounded-xl text-center font-black tabular-nums"
                                                    />
                                                    <InputError message={(errors as Record<string, string>)[`progress.${index}.percentage`]} />
                                                </div>
                                            </div>

                                            {/* Note */}
                                            <div className="mt-3 space-y-1.5">
                                                <Label
                                                    htmlFor={`step-note-${index}`}
                                                    className="text-[10px] font-black uppercase tracking-wider text-muted-foreground"
                                                >
                                                    Note <span className="font-normal normal-case">(optional)</span>
                                                </Label>
                                                <Input
                                                    id={`step-note-${index}`}
                                                    value={step.note}
                                                    onChange={(e) => updateStep(index, 'note', e.target.value)}
                                                    placeholder="Any extra context for the client…"
                                                    className="rounded-xl"
                                                />
                                            </div>

                                            {/* Mini progress bar for this step */}
                                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
                                                <div
                                                    className="h-full rounded-full bg-primary/60 transition-all duration-300"
                                                    style={{ width: `${Math.min(Number(step.percentage || 0), 100)}%` }}
                                                />
                                            </div>

                                            {/* Delete button */}
                                            <button
                                                type="button"
                                                onClick={() => removeStep(index)}
                                                className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100 text-destructive hover:text-destructive/80"
                                                title="Remove step"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
