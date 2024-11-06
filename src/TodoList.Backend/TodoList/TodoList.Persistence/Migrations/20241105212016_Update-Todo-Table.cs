using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoList.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTodoTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Todos");

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "Todos",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "Todos");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Todos",
                type: "text",
                nullable: true);
        }
    }
}
