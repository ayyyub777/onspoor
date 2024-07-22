<?php

namespace App\Http\Controllers;

use App\Enums\Priority;
use App\Enums\Status;
use App\Models\Issue;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;

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

    public function getIssuesByDate(Request $request)
    {
        $user = $request->user();
        try {
            $buildCountCases = function (array $enumCases, string $field): string {
                return collect($enumCases)
                    ->map(fn ($case) => "'{$case->value}', CAST(COUNT(CASE WHEN {$field} = '{$case->value}' THEN 1 END) AS UNSIGNED)")
                    ->implode(', ');
            };

            $statusCounts = $buildCountCases(Status::cases(), 'status');
            $priorityCounts = $buildCountCases(Priority::cases(), 'priority');

            $issues = Issue::where('user_id', $user->id)
                ->select(DB::raw('DATE(created_at) as date'))
                ->selectRaw("
                    JSON_OBJECT(
                        'status', JSON_OBJECT({$statusCounts}),
                        'priority', JSON_OBJECT({$priorityCounts})
                    ) as counts
                ")
                ->groupBy(DB::raw('DATE(created_at)'))
                ->get()
                ->map(function ($issue) {
                    $issue->counts = json_decode($issue->counts, true);
                    return $issue;
                });

            return $this->successResponse($issues, 'Issues grouped by date retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Error retrieving grouped issues: ' . $e->getMessage(), 500);
        }
    }
}
