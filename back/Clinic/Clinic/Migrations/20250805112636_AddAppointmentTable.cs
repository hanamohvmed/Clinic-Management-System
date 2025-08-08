using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Clinic.Migrations
{
	/// <inheritdoc />
	public partial class AddAppointmentTable : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				name: "Appointments",
				columns: table => new
				{
					Id = table.Column<int>(type: "int", nullable: false)
						.Annotation("SqlServer:Identity", "1, 1"),
					DoctorSlotId = table.Column<int>(type: "int", nullable: false),
					PatientId = table.Column<string>(type: "nvarchar(450)", nullable: false),
					PhoneNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
					Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
					BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
					AssignedTime = table.Column<TimeSpan>(type: "time", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Appointments", x => x.Id);
					table.ForeignKey(
						name: "FK_Appointments_AspNetUsers_PatientId",
						column: x => x.PatientId,
						principalTable: "AspNetUsers",
						principalColumn: "Id",
						onDelete: ReferentialAction.Restrict);
					table.ForeignKey(
						name: "FK_Appointments_TimeSlots_DoctorSlotId",
						column: x => x.DoctorSlotId,
						principalTable: "TimeSlots",
						principalColumn: "Id",
						onDelete: ReferentialAction.Restrict);
				});

			migrationBuilder.CreateIndex(
				name: "IX_Appointments_DoctorSlotId",
				table: "Appointments",
				column: "DoctorSlotId");

			migrationBuilder.CreateIndex(
				name: "IX_Appointments_PatientId",
				table: "Appointments",
				column: "PatientId");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "Appointments");
		}
	}
}
