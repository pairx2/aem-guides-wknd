package com.abbott.magento.identity.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;

@Generated("com.robohorse.robopojogenerator")
public class StockItem{

	@JsonProperty("min_sale_qty")
	private int minSaleQty;

	@JsonProperty("qty_increments")
	private int qtyIncrements;

	@JsonProperty("stock_status_changed_auto")
	private int stockStatusChangedAuto;

	@JsonProperty("is_in_stock")
	private boolean isInStock;

	@JsonProperty("show_default_notification_message")
	private boolean showDefaultNotificationMessage;

	@JsonProperty("use_config_max_sale_qty")
	private boolean useConfigMaxSaleQty;

	@JsonProperty("product_id")
	private int productId;

	@JsonProperty("use_config_qty_increments")
	private boolean useConfigQtyIncrements;

	@JsonProperty("notify_stock_qty")
	private int notifyStockQty;

	@JsonProperty("manage_stock")
	private boolean manageStock;

	@JsonProperty("item_id")
	private int itemId;

	@JsonProperty("min_qty")
	private int minQty;

	@JsonProperty("use_config_min_qty")
	private boolean useConfigMinQty;

	@JsonProperty("use_config_notify_stock_qty")
	private boolean useConfigNotifyStockQty;

	@JsonProperty("stock_id")
	private int stockId;

	@JsonProperty("use_config_backorders")
	private boolean useConfigBackorders;

	@JsonProperty("max_sale_qty")
	private int maxSaleQty;

	@JsonProperty("backorders")
	private int backorders;

	@JsonProperty("qty")
	private int qty;

	@JsonProperty("use_config_enable_qty_inc")
	private boolean useConfigEnableQtyInc;

	@JsonProperty("is_decimal_divided")
	private boolean isDecimalDivided;

	@JsonProperty("enable_qty_increments")
	private boolean enableQtyIncrements;

	@JsonProperty("is_qty_decimal")
	private boolean isQtyDecimal;

	@JsonProperty("use_config_manage_stock")
	private boolean useConfigManageStock;

	@JsonProperty("low_stock_date")
	private Object lowStockDate;

	@JsonProperty("use_config_min_sale_qty")
	private int useConfigMinSaleQty;

	public void setMinSaleQty(int minSaleQty){
		this.minSaleQty = minSaleQty;
	}

	public int getMinSaleQty(){
		return minSaleQty;
	}

	public void setQtyIncrements(int qtyIncrements){
		this.qtyIncrements = qtyIncrements;
	}

	public int getQtyIncrements(){
		return qtyIncrements;
	}

	public void setStockStatusChangedAuto(int stockStatusChangedAuto){
		this.stockStatusChangedAuto = stockStatusChangedAuto;
	}

	public int getStockStatusChangedAuto(){
		return stockStatusChangedAuto;
	}

	public void setIsInStock(boolean isInStock){
		this.isInStock = isInStock;
	}

	public boolean isIsInStock(){
		return isInStock;
	}

	public void setShowDefaultNotificationMessage(boolean showDefaultNotificationMessage){
		this.showDefaultNotificationMessage = showDefaultNotificationMessage;
	}

	public boolean isShowDefaultNotificationMessage(){
		return showDefaultNotificationMessage;
	}

	public void setUseConfigMaxSaleQty(boolean useConfigMaxSaleQty){
		this.useConfigMaxSaleQty = useConfigMaxSaleQty;
	}

	public boolean isUseConfigMaxSaleQty(){
		return useConfigMaxSaleQty;
	}

	public void setProductId(int productId){
		this.productId = productId;
	}

	public int getProductId(){
		return productId;
	}

	public void setUseConfigQtyIncrements(boolean useConfigQtyIncrements){
		this.useConfigQtyIncrements = useConfigQtyIncrements;
	}

	public boolean isUseConfigQtyIncrements(){
		return useConfigQtyIncrements;
	}

	public void setNotifyStockQty(int notifyStockQty){
		this.notifyStockQty = notifyStockQty;
	}

	public int getNotifyStockQty(){
		return notifyStockQty;
	}

	public void setManageStock(boolean manageStock){
		this.manageStock = manageStock;
	}

	public boolean isManageStock(){
		return manageStock;
	}

	public void setItemId(int itemId){
		this.itemId = itemId;
	}

	public int getItemId(){
		return itemId;
	}

	public void setMinQty(int minQty){
		this.minQty = minQty;
	}

	public int getMinQty(){
		return minQty;
	}

	public void setUseConfigMinQty(boolean useConfigMinQty){
		this.useConfigMinQty = useConfigMinQty;
	}

	public boolean isUseConfigMinQty(){
		return useConfigMinQty;
	}

	public void setUseConfigNotifyStockQty(boolean useConfigNotifyStockQty){
		this.useConfigNotifyStockQty = useConfigNotifyStockQty;
	}

	public boolean isUseConfigNotifyStockQty(){
		return useConfigNotifyStockQty;
	}

	public void setStockId(int stockId){
		this.stockId = stockId;
	}

	public int getStockId(){
		return stockId;
	}

	public void setUseConfigBackorders(boolean useConfigBackorders){
		this.useConfigBackorders = useConfigBackorders;
	}

	public boolean isUseConfigBackorders(){
		return useConfigBackorders;
	}

	public void setMaxSaleQty(int maxSaleQty){
		this.maxSaleQty = maxSaleQty;
	}

	public int getMaxSaleQty(){
		return maxSaleQty;
	}

	public void setBackorders(int backorders){
		this.backorders = backorders;
	}

	public int getBackorders(){
		return backorders;
	}

	public void setQty(int qty){
		this.qty = qty;
	}

	public int getQty(){
		return qty;
	}

	public void setUseConfigEnableQtyInc(boolean useConfigEnableQtyInc){
		this.useConfigEnableQtyInc = useConfigEnableQtyInc;
	}

	public boolean isUseConfigEnableQtyInc(){
		return useConfigEnableQtyInc;
	}

	public void setIsDecimalDivided(boolean isDecimalDivided){
		this.isDecimalDivided = isDecimalDivided;
	}

	public boolean isIsDecimalDivided(){
		return isDecimalDivided;
	}

	public void setEnableQtyIncrements(boolean enableQtyIncrements){
		this.enableQtyIncrements = enableQtyIncrements;
	}

	public boolean isEnableQtyIncrements(){
		return enableQtyIncrements;
	}

	public void setIsQtyDecimal(boolean isQtyDecimal){
		this.isQtyDecimal = isQtyDecimal;
	}

	public boolean isIsQtyDecimal(){
		return isQtyDecimal;
	}

	public void setUseConfigManageStock(boolean useConfigManageStock){
		this.useConfigManageStock = useConfigManageStock;
	}

	public boolean isUseConfigManageStock(){
		return useConfigManageStock;
	}

	public void setLowStockDate(Object lowStockDate){
		this.lowStockDate = lowStockDate;
	}

	public Object getLowStockDate(){
		return lowStockDate;
	}

	public void setUseConfigMinSaleQty(int useConfigMinSaleQty){
		this.useConfigMinSaleQty = useConfigMinSaleQty;
	}

	public int getUseConfigMinSaleQty(){
		return useConfigMinSaleQty;
	}

	@Override
 	public String toString(){
		return 
			"StockItem{" + 
			"min_sale_qty = '" + minSaleQty + '\'' + 
			",qty_increments = '" + qtyIncrements + '\'' + 
			",stock_status_changed_auto = '" + stockStatusChangedAuto + '\'' + 
			",is_in_stock = '" + isInStock + '\'' + 
			",show_default_notification_message = '" + showDefaultNotificationMessage + '\'' + 
			",use_config_max_sale_qty = '" + useConfigMaxSaleQty + '\'' + 
			",product_id = '" + productId + '\'' + 
			",use_config_qty_increments = '" + useConfigQtyIncrements + '\'' + 
			",notify_stock_qty = '" + notifyStockQty + '\'' + 
			",manage_stock = '" + manageStock + '\'' + 
			",item_id = '" + itemId + '\'' + 
			",min_qty = '" + minQty + '\'' + 
			",use_config_min_qty = '" + useConfigMinQty + '\'' + 
			",use_config_notify_stock_qty = '" + useConfigNotifyStockQty + '\'' + 
			",stock_id = '" + stockId + '\'' + 
			",use_config_backorders = '" + useConfigBackorders + '\'' + 
			",max_sale_qty = '" + maxSaleQty + '\'' + 
			",backorders = '" + backorders + '\'' + 
			",qty = '" + qty + '\'' + 
			",use_config_enable_qty_inc = '" + useConfigEnableQtyInc + '\'' + 
			",is_decimal_divided = '" + isDecimalDivided + '\'' + 
			",enable_qty_increments = '" + enableQtyIncrements + '\'' + 
			",is_qty_decimal = '" + isQtyDecimal + '\'' + 
			",use_config_manage_stock = '" + useConfigManageStock + '\'' + 
			",low_stock_date = '" + lowStockDate + '\'' + 
			",use_config_min_sale_qty = '" + useConfigMinSaleQty + '\'' + 
			"}";
		}
}