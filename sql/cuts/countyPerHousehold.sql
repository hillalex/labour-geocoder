DO $$
DECLARE data integer;
    DECLARE id integer;
    DECLARE area integer;

BEGIN

SELECT dataTypeId
               from dataType
               where dataTypeName = 'decimal' into data;

SELECT areaTypeId
from areaType
where areaTypeName = 'county' into area;

insert into statType (statTypeName, areaTypeId, dataTypeId)
values ('perhouseholdcuts', area, data);

SELECT statTypeId
               from statType
               where statTypeName = 'perhouseholdcuts'
               and areaTypeId = area into id;

insert into statistics (onscode, statTypeId, value, date)
values
('E10000017',id,'-226.68',DATE '2020-01-01'),
('E10000032',id,'-62.4',DATE '2020-01-01'),
('E10000023',id,'-94.11',DATE '2020-01-01'),
('999999999',id,'0',DATE '2020-01-01'),
('E10000006',id,'-206.58',DATE '2020-01-01'),
('E10000007',id,'-190.75',DATE '2020-01-01'),
('E10000008',id,'-90.474707',DATE '2020-01-01'),
('E10000009',id,'-69.83602',DATE '2020-01-01'),
('E10000013',id,'-132.865095',DATE '2020-01-01'),
('E10000015',id,'-134.94',DATE '2020-01-01'),
('E10000016',id,'-128.61',DATE '2020-01-01'),
('E10000018',id,'-75.72',DATE '2020-01-01'),
('E10000019',id,'0',DATE '2020-01-01'),
('E10000021',id,'-108.44',DATE '2020-01-01'),
('E10000024',id,'-173.27',DATE '2020-01-01'),
('E10000025',id,'-102.28',DATE '2020-01-01'),
('E10000027',id,'-115.528323',DATE '2020-01-01'),
('E10000028',id,'-149.94',DATE '2020-01-01'),
('E10000029',id,'-162.16',DATE '2020-01-01'),
('E10000030',id,'-14.33',DATE '2020-01-01'),
('E10000031',id,'-74.87',DATE '2020-01-01'),
('E10000034',id,'-86.19',DATE '2020-01-01'),
('E10000011',id,'-135.44',DATE '2020-01-01'),
('E10000002',id,'-25.32',DATE '2020-01-01'),
('E10000014',id,'-91.1',DATE '2020-01-01'),
('E10000020',id,'-167.2',DATE '2020-01-01'),
('E10000003',id,'-53.42',DATE '2020-01-01'),
('E10000012',id,'-117.01',DATE '2020-01-01');


END $$;