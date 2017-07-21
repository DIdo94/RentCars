﻿using AspNet.Identity.MongoDB;
using Microsoft.AspNet.Identity;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [BsonIgnoreIfNull]
        public DateTime DateOfBirth { get; set; }

        public string ImageUrl { get; set; }

        public ICollection<RentalHistory> RentalHistories { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            return userIdentity;
        }
    }
}
