#!/bin/bash

echo "Repairing migration history..."

# First, revert old migrations
for i in {1..14}
do
    num=$(printf "%04d" $i)
    echo "Repairing migration $num as reverted..."
    supabase migration repair --status reverted $num
done

# Then, apply new migrations
echo "Applying new migrations..."
supabase migration repair --status applied 20240101000000
supabase migration repair --status applied 20240101000001
supabase migration repair --status applied 20240101000002
supabase migration repair --status applied 20240101000003

echo "Migration repair complete. Now run:"
echo "supabase db pull"
echo "supabase db push"
