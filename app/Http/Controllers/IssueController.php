<?php

namespace App\Http\Controllers;

use App\Enums\Priority;
use App\Enums\Status;
use App\Models\Issue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

class IssueController extends Controller
{
    public function index()
    {
        try {
            $issues = Issue::all();
            return response()->json([
                'status' => 'success',
                'data' => $issues,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching issues',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function view($id)
    {
        try {
            $issue = Issue::find($id);
            return response()->json([
                'status' => 'success',
                'data' => $issue,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching issue',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            Issue::create($request->validate([
                'title' => 'required',
                'status' => 'required',
                'priority' => 'required',
                'assignee' => 'required',
            ]));
            return response()->json([
                'status' => 'success',
                'message' => 'Issue created successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error creating issue',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $issue = Issue::find($id);
            $issue->update($request->validate([
                'title' => 'required',
                'status' => 'required',
                'priority' => 'required',
                'assignee' => 'required',
            ]));
            return response()->json([
                'status' => 'success',
                'message' => 'Issue updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error updating issue',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $issue = Issue::find($id);
            $issue->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Issue deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error deleting issue',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
