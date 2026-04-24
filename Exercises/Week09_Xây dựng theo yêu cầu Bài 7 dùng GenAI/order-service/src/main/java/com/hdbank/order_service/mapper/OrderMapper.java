package com.hdbank.order_service.mapper;

import com.hdbank.order_service.dto.OrderLineItemsDto;
import com.hdbank.order_service.model.OrderLineItems;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderLineItems mapToModel(OrderLineItemsDto orderLineItemsDto);
    OrderLineItemsDto mapToDto(OrderLineItems orderLineItems);
}
