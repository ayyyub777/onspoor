<?php

namespace App\Http\Controllers;

use App\Models\Resolver;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class ResolverController extends Controller
{
    use ApiResponses;

    public function index(Request $request)
    {
        $user = $request->user();
        try {
            $issues = Resolver::with('user')->where('user_id', $user->id)->get();
            return $this->successResponse($issues, 'Resolvers retrieved successfully');
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
            $issue = Resolver::with('user')->where('id', $id)->where('user_id', $user->id)->firstOrFail();
            return $this->successResponse($issue, 'Resolver retrieved successfully');
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Resolver not found', 404);
        } catch (ValidationException $e) {
            return $this->validationErrorResponse($e);
        } catch (\Exception $e) {
            return $this->errorResponse('Error retrieving resolver: ' . $e->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        $user = $request->user();
        try {
            $validatedData = $request->validate([
                'name' => 'required',
                'email' => 'email|required',
            ]);

            $issue = Resolver::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'user_id' => $user->id,
            ]);
            return $this->successResponse($issue, 'Resolver created successfully');
        } catch (ValidationException $e) {
            return $this->validationErrorResponse($e);
        } catch (\Exception $e) {
            return $this->errorResponse('Error creating resolver: ' . $e->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        $user = $request->user();
        try {
            $issue = Resolver::with('user')->where('id', $id)->where('user_id', $user->id)->firstOrFail();
            $issue->update($request->validate([
                'name' => 'required',
                'email' => 'email|required',
            ]));
            return $this->successResponse($issue, 'Resolver updated successfully');
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Resolver not found', 404);
        } catch (ValidationException $e) {
            return $this->validationErrorResponse($e);
        } catch (\Exception $e) {
            return $this->errorResponse('Error updating resolver: ' . $e->getMessage(), 500);
        }
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        try {
            $issue = Resolver::with('user')->where('id', $id)->where('user_id', $user->id)->firstOrFail();
            $issue->delete();
            return $this->successResponse(null, 'Resolver deleted successfully');
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Resolver not found', 404);
        } catch (\Exception $e) {
            return $this->errorResponse('Error deleting resolver: ' . $e->getMessage(), 500);
        }
    }
}
