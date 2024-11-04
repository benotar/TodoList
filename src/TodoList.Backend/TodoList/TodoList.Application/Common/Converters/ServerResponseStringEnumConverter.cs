using System.Text.Json;
using System.Text.Json.Serialization;
using TodoList.Application.Extensions;

namespace TodoList.Application.Common.Converters;

public class ServerResponseStringEnumConverter<TEnum> : JsonConverter<TEnum>
    where TEnum : struct, Enum
{
    public override TEnum Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return Enum.Parse<TEnum>(reader.GetString(), ignoreCase: true);
    }

    public override void Write(Utf8JsonWriter writer, TEnum value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToErrorString());
    }
}