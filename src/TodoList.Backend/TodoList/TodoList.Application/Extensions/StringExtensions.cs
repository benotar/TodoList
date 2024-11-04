namespace TodoList.Application.Extensions;

public static class StringExtensions
{
    public static string ToLowerFistLetter(this string str)
        => char.ToLower(str[0]) + str[1..];
}