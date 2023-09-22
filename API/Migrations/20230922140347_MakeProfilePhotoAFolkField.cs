using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class MakeProfilePhotoAFolkField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ProfilePhotos",
                table: "ProfilePhotos");

            migrationBuilder.RenameTable(
                name: "ProfilePhotos",
                newName: "ProfilePhoto");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ProfilePhoto",
                newName: "Id");

            migrationBuilder.AddColumn<int>(
                name: "ProfilePhotoId",
                table: "Folks",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProfilePhoto",
                table: "ProfilePhoto",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Folks_ProfilePhotoId",
                table: "Folks",
                column: "ProfilePhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Folks_ProfilePhoto_ProfilePhotoId",
                table: "Folks",
                column: "ProfilePhotoId",
                principalTable: "ProfilePhoto",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Folks_ProfilePhoto_ProfilePhotoId",
                table: "Folks");

            migrationBuilder.DropIndex(
                name: "IX_Folks_ProfilePhotoId",
                table: "Folks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProfilePhoto",
                table: "ProfilePhoto");

            migrationBuilder.DropColumn(
                name: "ProfilePhotoId",
                table: "Folks");

            migrationBuilder.RenameTable(
                name: "ProfilePhoto",
                newName: "ProfilePhotos");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ProfilePhotos",
                newName: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProfilePhotos",
                table: "ProfilePhotos",
                column: "UserId");
        }
    }
}
