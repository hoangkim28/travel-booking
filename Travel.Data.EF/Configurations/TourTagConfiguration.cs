using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Travel.Data.EF.Extensions;
using Travel.Data.Entities;

namespace Travel.Data.EF.Configurations
{
    public class TourTagConfiguration : DbEntityConfiguration<TourTag>
    {
        public override void Configure(EntityTypeBuilder<TourTag> entity)
        {
            entity.Property(c => c.TagId).HasMaxLength(50).IsRequired();
            // etc.
        }
    }
}