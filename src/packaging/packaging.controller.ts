import { Controller, Post, Get, Param, Body, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiSecurity } from "@nestjs/swagger";
import { PackagingService } from "./packaging.service";
import { LoadItemDto } from "./dto/LoadItemDto.dto";
import { Roles } from "src/auth/decorator/roles.decorator";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AuthorizationGuard } from "src/guards/authorization.guard";


@ApiTags("packaging")
@Controller("packaging")
export class PackagingController {
  constructor(private readonly packagingService: PackagingService) {}

  @ApiOperation({ summary: "Load an item into a vehicle" })
  @ApiBody({ type: LoadItemDto })
  @ApiResponse({ status: 200, description: "Item loaded successfully." })
  // @UseGuards(AuthenticationGuard, AuthorizationGuard)
  // @Roles('logistics', 'admin')
  // @ApiSecurity('jwt')
  @Post("load/:vehicleId")
  async loadItemToVehicle(
    @Param("vehicleId") vehicleId: number, 
    @Body() loadItemDto: LoadItemDto
  ) {
    return this.packagingService.loadItemToVehicle(
      vehicleId, 
      loadItemDto.itemId, 
      // loadItemDto.quantity, 
    );
  }
// @ApiOperation({ summary: "Get all vehicles with their items" })
// @ApiResponse({ status: 200, description: "List of vehicles with their items." })
// @Get("vehicle")
// async getAllVehiclesWithItems() {
//   const vehicles = await this.packagingService.getAllVehiclesWithItems();
//   return vehicles.map((vehicle) => ({
//     ...vehicle,
//     items: vehicle.items.map((item) => ({
//       itemId: item.id,
//       itemName: item.name,
//       quantity: vehicle.packagings.find((p) => p.item.id === item.id)?.quantity || 0,
//       stockId: vehicle.packagings.find((p) => p.item.id === item.id)?.stock.id,
//     })),
//   }));
// }

@Get('count/packagings')
  async getPackingCount() {

    const count = await this.packagingService.CountPackaging();

    return { count }
  
  }


@Get('/findall')
async getall(){
  
  return this.packagingService.findall()
}
}