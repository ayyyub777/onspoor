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
    public function index(Request $request)
    {
        $user = $request->user();
        try {
            $issues = Issue::with('user')->where('user_id', $user->id)->get();
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

    public function view(Request $request, $id)
    {
        $user = $request->user();
        try {
            $issue = Issue::find($id)::with('user')->where('user_id', $user->id)->get();
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
        $user = $request->user();
        try {
            $validatedData = $request->validate([
                'title' => 'required',
                'status' => 'required',
                'priority' => 'required',
                'assignee' => 'required',
            ]);

            $issue = Issue::create([
                'title' => $validatedData['title'],
                'status' => $validatedData['status'],
                'priority' => $validatedData['priority'],
                'assignee' => $validatedData['assignee'],
                'user_id' => $user->id,
            ]);
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
        $user = $request->user();
        try {
            $issue = Issue::with('user')->where('id', $id)->where('user_id', $user->id)->firstOrFail();
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

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        try {
            $issue = Issue::find($id)::with('user')->where('user_id', $user->id)->get();
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
