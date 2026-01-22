<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filters = session('lead_filters', [
            'search' => '',
            'status' => '',
            'sort' => 'desc',
        ]);

        $leads = Lead::query()
            ->when($filters['search'], function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($filters['status'], function ($query, $status) {
                $query->where('status', $status);
            })
            ->orderBy('created_at', $filters['sort'])
            ->paginate(10);

        return Inertia::render('Leads/Index', [
            'leads' => $leads,
            'filters' => $filters,
            'statusOptions' => Lead::STATUSES,
        ]);
    }

    /**
     * Handle filtering and sorting (Session-based to avoid URL params).
     */
    public function filter(Request $request)
    {
        session(['lead_filters' => $request->only(['search', 'status', 'sort'])]);
        return redirect()->route('leads.index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeadRequest $request)
    {
        Lead::create($request->validated());

        return redirect()->route('leads.index')->with('success', 'Lead created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeadRequest $request, Lead $lead)
    {
        $lead->update($request->validated());

        return redirect()->route('leads.index')->with('success', 'Lead updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lead $lead)
    {
        Gate::authorize('delete', $lead);
        $lead->delete();

        return redirect()->route('leads.index')->with('success', 'Lead deleted successfully.');
    }
}

