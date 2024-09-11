package com.abbott.aem.an.abbottstore.services;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;

/**
 * @author saikrishna.s
 * 
 *         RenditionsService - This OSGI service interface will provide methods
 *         to get renditions data..
 *
 */
public interface RenditionsService {

	/**
	 * Generate renditions.
	 *
	 * @param asset                 the asset
	 * @param rendition             the rendition
	 * @param originalFileName      the original file name
	 * @param originalFileExtension the original file extension
	 * @param path                  the path
	 * @return the asset
	 */
	public Asset generateRenditions(Asset asset, Rendition rendition, String originalFileName,
			String originalFileExtension, String path);

	/**
	 * Generate custom responsive renditions.
	 *
	 * @param asset                 the asset
	 * @param rendition             the rendition
	 * @param originalFileName      the original file name
	 * @param originalFileExtension the original file extension
	 * @return the asset
	 */
	public Asset generateCustomResponsiveRenditions(Asset asset, Rendition rendition, String originalFileName,
			String originalFileExtension);

	/**
	 * Gets the asset from payload.
	 *
	 * @param item      the item
	 * @param wfSession the wf session
	 * @return the asset from payload
	 */
	public Asset getAssetFromPayload(WorkItem item, WorkflowSession wfSession);

	/**
	 * Gets the dam path.
	 *
	 * @return the dam path
	 */
	public String getDamPath();
}
