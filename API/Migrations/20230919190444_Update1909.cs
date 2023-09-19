using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Update1909 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RequestKey",
                table: "Requests",
                newName: "RequestId");

            migrationBuilder.RenameColumn(
                name: "FolkKey",
                table: "Folks",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RequestId",
                table: "Requests",
                newName: "RequestKey");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Folks",
                newName: "FolkKey");
        }
    }
}
