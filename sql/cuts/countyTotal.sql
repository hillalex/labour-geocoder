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
values ('totalcuts', area, data);

SELECT statTypeId
from statType
where statTypeName = 'totalcuts'
and areaTypeId = area into id;

insert into statistics (onscode, statTypeId, value, date)
values
('E10000017', id,'-120985226', DATE '2020-01-01'),
('E10000032', id,'0', DATE '2020-01-01'),
('E10000023', id,'-26402163', DATE '2020-01-01'),
('999999999', id,'0', DATE '2020-01-01'),
('E10000006', id,'-50116552', DATE '2020-01-01'),
('E10000007', id,'-67174801', DATE '2020-01-01'),
('E10000008', id,'-32690411.65', DATE '2020-01-01'),
('E10000009', id,'-13847644.7', DATE '2020-01-01'),
('E10000013', id,'-37184289.74', DATE '2020-01-01'),
('E10000015', id,'-64826456', DATE '2020-01-01'),
('E10000016', id,'-83493110', DATE '2020-01-01'),
('E10000018', id,'-21655421', DATE '2020-01-01'),
('E10000019', id,'0', DATE '2020-01-01'),
('E10000021', id,'-33623414', DATE '2020-01-01'),
('E10000024', id,'-61830852', DATE '2020-01-01'),
('E10000025', id,'-28644029', DATE '2020-01-01'),
('E10000027', id,'-28787694.2', DATE '2020-01-01'),
('E10000028', id,'-55676008', DATE '2020-01-01'),
('E10000029', id,'-54359638', DATE '2020-01-01'),
('E10000030', id,'-6942568', DATE '2020-01-01'),
('E10000031', id,'-18351259', DATE '2020-01-01'),
('E10000034', id,'-22058863', DATE '2020-01-01'),
('E10000011', id,'-33541449', DATE '2020-01-01'),
('E10000002', id,'-5456192', DATE '2020-01-01'),
('E10000014', id,'-52631505', DATE '2020-01-01'),
('E10000020', id,'-68698435', DATE '2020-01-01'),
('E10000003', id,'-14620036', DATE '2020-01-01'),
('E10000012', id,'-72616894', DATE '2020-01-01');

END $$;