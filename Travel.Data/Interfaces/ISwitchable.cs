using Travel.Data.Enums;

namespace Travel.Data.Interfaces
{
    public interface ISwitchable
    {
        Status Status { set; get; }
    }
}