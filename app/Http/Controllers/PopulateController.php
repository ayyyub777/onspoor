<?php

namespace App\Http\Controllers;

use App\Enums\Priority;
use App\Enums\Status;
use App\Models\Issue;
use App\Models\Resolver;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PopulateController extends Controller
{
    use ApiResponses;

    public function populate(Request $request)
    {
        $user = $request->user();
        try {

            DB::beginTransaction();

            $faker = \Faker\Factory::create();

            $resolvers = [];
            for ($i = 0; $i < 4; $i++) {
                $resolver = new Resolver();
                $resolver->name = $faker->name();
                $resolver->email = $faker->email();
                $resolver->user_id = $user->id;
                $resolver->save();
                $resolvers[] = $resolver;
            }

            $priorities = [Priority::LOW, Priority::MEDIUM, Priority::HIGH];
            $statuses = [Status::BACKLOG, Status::TODO, Status::IN_PROGRESS, Status::DONE, Status::CANCELED];

            $issues = [];
            for ($i = 0; $i < 24; $i++) {
                $issue = new Issue();
                $issue->title = $faker->sentence(6, true);
                $issue->priority = $faker->randomElement($priorities)->value;
                $issue->status = $faker->randomElement($statuses)->value;
                $issue->assignee = $faker->randomElement($resolvers)->name;
                $createdAt = Carbon::now()->subDays(rand(0, 6))->subHours(rand(0, 23))->subMinutes(rand(0, 59));
                $issue->created_at = $createdAt;
                $issue->updated_at = $createdAt;
                $issue->user_id = $user->id;

                $issue->save();
                $issues[] = $issue;
            }

            DB::commit();
            return $this->successResponse([], 'Data created successfully');
        } catch (ValidationException $e) {
            DB::rollBack();
            return $this->validationErrorResponse($e);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse('Error creating issue: ' . $e->getMessage(), 500);
        }
    }
}
