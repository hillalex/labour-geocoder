   CREATE OR REPLACE FUNCTION get_bestoff(regionname VARCHAR(70), refcursor)
   RETURNS refcursor AS $$
    DECLARE
      ref refcursor := 'regioncursor';
    BEGIN
    OPEN ref FOR
     select region, name, percentagecuts
from

(select region,
	   name,
       percentagecuts,
       min(percentagecuts) over (partition by region) as min_cuts
	from localauthority where region = regionname)
	as region
	where percentagecuts = min_cuts;
	 RETURN ref;
    END;
     $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_bestoff_absolute(regionname VARCHAR(70), refcursor)
        RETURNS refcursor AS $$
         DECLARE
           ref refcursor := 'regioncursor';
         BEGIN
         OPEN ref FOR
          select region, name, totalcuts
     from

     (select region,
     	    name,
            totalcuts,
            max(totalcuts) over (partition by region) as min_cuts
     	from localauthority where region = regionname)
     	as region
     	where totalcuts = min_cuts;
     	 RETURN ref;
         END;
          $$ LANGUAGE plpgsql;
