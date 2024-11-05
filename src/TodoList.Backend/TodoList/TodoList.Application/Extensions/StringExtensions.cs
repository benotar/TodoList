namespace TodoList.Application.Extensions;

public static class StringExtensions
{
    public static string ToLowerFistLetter(this string str)
        => string.IsNullOrEmpty(str) ? str : char.ToLower(str[0]) + str[1..];

    public static string ToUpperFirstLetter(this string str)
        => string.IsNullOrEmpty(str) ? str : char.ToUpper(str[0]) + str[1..];
}