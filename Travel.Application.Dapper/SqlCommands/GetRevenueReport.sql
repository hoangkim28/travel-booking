CREATE PROC GetRevenueDaily
	@fromDate VARCHAR(10),
	@toDate VARCHAR(10)
AS
BEGIN
		  select
                CAST(b.DateCreated AS DATE) as Date,
                sum(bd.Quantity*bd.Price) as Revenue,
                sum((bd.Quantity*bd.Price)-(bd.Quantity * p.OriginalPrice)) as Profit
                from Bills b
                inner join dbo.BillDetails bd
                on b.Id = bd.BillId
                inner join Tours p
                on bd.TourId  = p.Id
                where b.DateCreated <= cast(@toDate as date) 
				AND b.DateCreated >= cast(@fromDate as date)
                AND b.BillStatus = 4
                group by b.DateCreated
END
GO
EXEC dbo.GetRevenueDaily @fromDate = '05/10/2020',
                         @toDate = '05/30/2020' 