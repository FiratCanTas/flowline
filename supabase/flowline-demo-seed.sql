-- Flowline demo account seed
--
-- Before running:
--   1. Supabase Dashboard > Authentication > Users > Add user > Create new user
--      (tick "Auto Confirm User", use a throwaway password that is not reused anywhere)
--   2. Make sure v_email below matches that user's email.
--
-- Safe to re-run: it only touches rows owned by the demo user, wipes them and
-- re-inserts everything. Dates are relative to now(), so re-run it whenever the
-- demo data starts to look stale.
--
-- Run in the Supabase SQL Editor (runs as postgres, so RLS is bypassed and
-- owner_id must be set explicitly).

do $$
declare
  v_email constant text := 'demo@example.com';
  v_owner uuid;
begin
  select id into v_owner from auth.users where email = v_email;

  if v_owner is null then
    raise exception 'Demo user % not found. Create it in Authentication > Users first.', v_email;
  end if;

  -- children first (activities -> deals -> contacts)
  delete from activities where owner_id = v_owner;
  delete from deals      where owner_id = v_owner;
  delete from contacts   where owner_id = v_owner;

  -- 8 contacts (page size is 5, so pagination shows 2 pages)
  insert into contacts (owner_id, name, email, phone, company, position)
  values
    (v_owner, 'Emma Johansson', 'emma.johansson@northwind.example', '+1 555 010 0101', 'Northwind Logistics',   'Head of Operations'),
    (v_owner, 'Marcus Chen',    'marcus.chen@brightwave.example',   '+1 555 010 0102', 'Brightwave Analytics',  'CTO'),
    (v_owner, 'Sofia Martinez', 'sofia.martinez@greenfield.example','+1 555 010 0103', 'Greenfield Retail',     'Procurement Manager'),
    (v_owner, 'Daniel Kowalski','daniel.kowalski@kowalski.example', '+1 555 010 0104', 'Kowalski Manufacturing','Managing Director'),
    (v_owner, 'Hannah Brooks',  'hannah.brooks@harborview.example', '+1 555 010 0105', 'Harborview Hotels',     'Operations Director'),
    (v_owner, 'Priya Patel',    'priya.patel@lumenhealth.example',  '+1 555 010 0106', 'Lumen Health',          'VP Finance'),
    (v_owner, 'Lucas Weber',    'lucas.weber@alpinesoft.example',   '+1 555 010 0107', 'Alpine Software',       'Product Lead'),
    (v_owner, 'Tomas Silva',    'tomas.silva@orbitfleet.example',   '+1 555 010 0108', 'Orbit Fleet Services',  'Fleet Manager');

  -- 8 deals, every stage has at least one
  insert into deals (owner_id, title, contact_id, value, stage, created_at)
  select v_owner, d.title, c.id, d.amount, d.stage, d.created
  from (values
    ('Fleet tracking rollout',          'emma.johansson@northwind.example', 42000, 'negotiation', now() - interval '30 days'),
    ('Analytics dashboard license',     'marcus.chen@brightwave.example',   68000, 'proposal',    now() - interval '25 days'),
    ('Store network POS upgrade',       'sofia.martinez@greenfield.example',85000, 'proposal',    now() - interval '10 days'),
    ('Line monitoring pilot',           'daniel.kowalski@kowalski.example', 27500, 'qualified',   now() - interval '8 days'),
    ('Guest experience app',            'hannah.brooks@harborview.example', 19000, 'lead',        now() - interval '4 days'),
    ('Employee onboarding portal',      'priya.patel@lumenhealth.example',  33000, 'lead',        now() - interval '9 days'),
    ('Warehouse scanner subscription',  'lucas.weber@alpinesoft.example',   31000, 'won',         now() - interval '45 days'),
    ('Fleet maintenance module',        'tomas.silva@orbitfleet.example',   23000, 'lost',        now() - interval '50 days')
  ) as d(title, contact_email, amount, stage, created)
  join contacts c on c.email = d.contact_email and c.owner_id = v_owner;

  -- activities: contact_id is taken from the deal, so the relation always matches
  insert into activities (owner_id, deal_id, contact_id, type, title, due_date, is_completed, created_at)
  select v_owner, d.id, d.contact_id, a.kind, a.title, a.due, a.done, a.created
  from (values
    -- negotiation, stale (last activity 8 days ago), overdue task
    ('Fleet tracking rollout',         'note', 'Legal requested MSA redlines',          null,                false, now() - interval '14 days'),
    ('Fleet tracking rollout',         'task', 'Send updated MSA draft',                current_date - 2,    false, now() - interval '8 days'),
    -- proposal, stale (last activity 12 days ago), overdue task
    ('Analytics dashboard license',    'task', 'Discovery call',                        current_date - 18,   true,  now() - interval '20 days'),
    ('Analytics dashboard license',    'task', 'Follow up on pricing questions',        current_date - 5,    false, now() - interval '12 days'),
    -- proposal, fresh, upcoming task
    ('Store network POS upgrade',      'note', 'Procurement wants 3-year pricing',      null,                false, now() - interval '6 days'),
    ('Store network POS upgrade',      'task', 'Present ROI model',                     current_date + 4,    false, now() - interval '3 days'),
    -- qualified, fresh, but one overdue task
    ('Line monitoring pilot',          'task', 'Site visit',                            current_date - 5,    true,  now() - interval '6 days'),
    ('Line monitoring pilot',          'task', 'Send NDA',                              current_date - 1,    false, now() - interval '4 days'),
    ('Line monitoring pilot',          'note', 'Daniel confirmed the budget owner',     null,                false, now() - interval '1 day'),
    -- lead, fresh, upcoming task
    ('Guest experience app',           'task', 'Book intro call',                       current_date + 3,    false, now() - interval '1 day'),
    -- lead, stale (last activity 6 days ago) and actionless (no open task)
    ('Employee onboarding portal',     'task', 'Intro call',                            current_date - 4,    true,  now() - interval '6 days'),
    -- won
    ('Warehouse scanner subscription', 'task', 'Send contract',                         current_date - 18,   true,  now() - interval '20 days'),
    ('Warehouse scanner subscription', 'note', 'Signed, kickoff planned for November',  null,                false, now() - interval '15 days'),
    -- lost
    ('Fleet maintenance module',       'task', 'Send revised quote',                    current_date - 33,   true,  now() - interval '35 days'),
    ('Fleet maintenance module',       'note', 'Lost to incumbent vendor on price',     null,                false, now() - interval '28 days')
  ) as a(deal_title, kind, title, due, done, created)
  join deals d on d.title = a.deal_title and d.owner_id = v_owner;
end $$;
