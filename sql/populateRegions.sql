DO $$
    DECLARE id integer;
BEGIN

SELECT  areaTypeId
               from areaType
               where areaTypeName = 'region' into id;

insert into area(areaTypeId,onscode,name)
values
(id,'E12000008','South East'),
(id,'E12000003','Yorkshire & the Humber'),
(id,'E12000009','South West'),
(id,'E12000005','West Midlands'),
(id,'E12000004','East Midlands'),
(id,'E12000006','East'),
(id,'E12000002','North West'),
(id,'E12000001','North East'),
(id,'E12000007','London');

END $$;