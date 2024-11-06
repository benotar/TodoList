using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoList.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initialcreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserName = table.Column<string>(type: "text", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "bytea", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "bytea", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Permission = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Todos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    IsCompleted = table.Column<bool>(type: "boolean", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Todos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Todos_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Name", "PasswordHash", "PasswordSalt", "Permission", "UpdatedAt", "UserName" },
                values: new object[] { new Guid("a4832f99-82d0-4931-9db6-d3e54280f17f"), new DateTime(2024, 11, 6, 16, 28, 25, 462, DateTimeKind.Utc).AddTicks(6699), "Admin", new byte[] { 4, 142, 70, 124, 152, 204, 46, 221, 243, 246, 181, 27, 255, 57, 224, 70, 5, 0, 255, 109, 127, 166, 137, 55, 166, 21, 111, 119, 206, 171, 155, 105 }, new byte[] { 130, 196, 232, 229, 205, 252, 181, 3, 159, 53, 100, 167, 20, 236, 32, 237, 23, 214, 223, 54, 162, 1, 251, 219, 200, 231, 90, 222, 104, 81, 128, 28, 120, 157, 240, 129, 240, 152, 210, 186, 30, 26, 109, 181, 49, 61, 108, 230, 189, 227, 139, 137, 120, 234, 65, 213, 102, 188, 16, 250, 11, 229, 59, 57 }, 0, new DateTime(2024, 11, 6, 16, 28, 25, 462, DateTimeKind.Utc).AddTicks(6704), "Admin" });

            migrationBuilder.CreateIndex(
                name: "IX_Todos_UserId",
                table: "Todos",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Todos");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
