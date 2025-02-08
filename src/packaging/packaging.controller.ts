import { Controller, Post, Get, Param, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger";
import { PackagingService } from "./packaging.service";
import { LoadItemDto } from "./dto/LoadItemDto.dto";


@ApiTags("packaging")
@Controller("packaging")
export class PackagingController {
  constructor(private readonly packagingService: PackagingService) {}

  @ApiOperation({ summary: "Load an item into a vehicle" })
  @ApiBody({ type: LoadItemDto })
  @ApiResponse({ status: 200, description: "Item loaded successfully." })
  @Post("load/:vehicleId")
  async loadItemToVehicle(@Param("vehicleId") vehicleId: number, @Body() loadItemDto: LoadItemDto) {
    return this.packagingService.loadItemToVehicle(
      vehicleId,
      loadItemDto.stockId,
      loadItemDto.itemId,
      loadItemDto.quantity
    );
  }

  @ApiOperation({ summary: "Get items in a vehicle" })
  @ApiResponse({ status: 200, description: "List of items in the vehicle." })
  @Get("vehicle/:vehicleId/items")
  async getItemsInVehicle(@Param("vehicleId") vehicleId: number) {
    return  await this.packagingService.getVehicleWithItems(vehicleId);
    //  vehicle.items.map((item) => ({
    //   itemId: item.id,
    //   itemName: item.name,
    //   quantity: vehicle.packagings.find((p) => p.item.id === item.id)?.quantity || 0,
    //   stockId: vehicle.packagings.find((p) => p.item.id === item.id)?.stock.id, // Include stock ID
    // }));
  }
}