BEGIN;
insert into areasForPostcodes(onscode, postcode, areatypeid, name) select a.onscode, p.postcode, a.areaTypeId, a.name from area a cross join postcode p where p.postcode like 'R%' and st_contains(a.location, p.location);
COMMIT;
