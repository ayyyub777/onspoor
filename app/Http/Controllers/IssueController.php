<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class IssueController extends Controller
{
    use ApiResponses;

    public function index(Request $request)
    {
        $user = $request->user();
        try {
            $issues = Issue::with('user')->where('user_id', $user->id)->get();
            return $this->successResponse($issues, 'Issues retrieved successfully');
        } catch (ValidationException $e) {
            return $this->validationErrorResponse($e);
        } catch (\Exception $e) {
            return $this->errorResponse('Error retrieving issues: ' . $e->getMessage(), 500);
        }
    }

    public function view(Request $request, $id)
    {
        $user = $request->user();
        try {
            $issue = Issue::with('user')->where('id', $id)->where('user_id', $user->id)->firstOrFail();
            return $this->successResponse($issue, 'Issue retrieved successfully');
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Issue not found', 404);
        } catch (ValidationException $e) {
            return $this->validationErrorResponse($e);
        } catch (\Exception $e) {
            return $this->errorResponse('Error retrieving issue: ' . $e->getMessage(), 500);
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
            return $this->successResponse($issue, 'Issue created successfully');
        } catch (ValidationException $e) {
            return $this->validationErrorResponse($e);
        } catch (\Exception $e) {
            return $this->errorResponse('Error creating issue: ' . $e->getMessage(), 500);
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
            return $this->successResponse($issue, 'Issue updated successfully');
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Issue not found', 404);
        } catch (ValidationException $e) {
            return $this->validationErrorResponse($e);
        } catch (\Exception $e) {
            return $this->errorResponse('Error updating issue: ' . $e->getMessage(), 500);
        }
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        try {
            $issue = Issue::with('user')->where('id', $id)->where('user_id', $user->id)->firstOrFail();
            $issue->delete();
            return $this->successResponse(null, 'Issue deleted successfully');
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Issue not found', 404);
        } catch (\Exception $e) {
            return $this->errorResponse('Error deleting issue: ' . $e->getMessage(), 500);
        }
    }
}
