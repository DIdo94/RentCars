using Models;
using MongoDB.Bson;
using System.Collections.Generic;

namespace Data.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAll();

        User GetById(string id);
    }
}
