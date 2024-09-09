using System.Linq.Expressions;

namespace TodoList.Application.Extensions;

public static class ExpressionExtensions
{
    public static Expression<Func<T, bool>> And<T>(this Expression<Func<T, bool>> first,
        Expression<Func<T, bool>> second)
    {
        var invokedExpression = Expression.Invoke(second, first.Parameters);

        var body = Expression.AndAlso(first.Body, invokedExpression);

        return Expression.Lambda<Func<T, bool>>(body, first.Parameters);
    }
}