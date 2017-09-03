using System.Collections.Generic;

namespace Models.RequestModels
{
    public class UsersFilterResult
    {
        public IEnumerable<ApplicationUser> Users { get; set; }

        public int TotalItems { get; set; }
    }
}
