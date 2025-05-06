CREATE OR REPLACE EDITIONABLE FUNCTION "SPORTS_EDELLINEN" (treeni_in IN varchar2, liike_in IN number, henkilo_in number)  return varchar2 as
treeni_lkm number;
treeni_nro number;
palauta varchar2(500);
begin
select  count(*) into treeni_lkm  --onko edellistä treeniä
        from treenikerta
        where treeni_id = treeni_in  AND liike = liike_in AND
        trunc(pvm) = (select max(trunc(pvm)) from TREENIKERTA  
        where treeni_id = treeni_in  and liike = liike_in
        AND trunc(pvm) < trunc(sysdate) ); 
if treeni_lkm > 0 then
        select   listagg (kg||'*'||toistot,',')  into palauta
            from treenikerta
            where treeni_id = treeni_in  AND liike = liike_in AND
            trunc(pvm) = (select max(trunc(pvm)) from TREENIKERTA  
            where treeni_id = treeni_in  and liike = liike_in
            AND trunc(pvm) < trunc(sysdate))
        ;    
else
    --haetaan viimeisin treeni_id jossa liike ollut liike_in
    select nvl(min(treeni_id),0) into treeni_nro 
    from treenikerta
    where henkilo_id = henkilo_in and liike = liike_in and deload is null 
    and pvm =
    (select max(pvm) from treenikerta 
        where liike = liike_in 
        and henkilo_id = henkilo_in 
        and deload is null 
        and trunc(pvm) < trunc(sysdate) );
    if treeni_nro > 0 then
        select 'max '||  listagg (kg||'*'||toistot,',')  into palauta
            from treenikerta
            where treeni_id = treeni_nro  AND liike = liike_in AND
            trunc(pvm) = (select max(trunc(pvm)) from TREENIKERTA  
            where treeni_id = treeni_nro  and liike = liike_in
            and deload is null 
            AND trunc(pvm) < trunc(sysdate));
    else
    --select 'ei löydy' into palauta from dual;
        palauta := 'ei löydy'; 
    end if;
end if;
return (palauta);
end;
/

