using System;
using System.Linq;
using System.Linq.Expressions;

namespace Reposotories.Extensions
{
    public static class ExpressionExtensions
    {
        public static Expression<Func<TDelegate, bool>> AddCondition<TDelegate>(this Expression<TDelegate> left, Expression<TDelegate> right)
        {
            InvocationExpression invokedExpression = Expression.Invoke(right, left.Parameters.Cast<Expression>());
            return Expression.Lambda<Func<TDelegate, bool>>
                  (Expression.AndAlso(left.Body, invokedExpression), left.Parameters);
        }
    }
}
