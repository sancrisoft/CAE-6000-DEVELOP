-- update 2.1.4 - all databases

-- update scnSystemExceedances to link acm_exceedance_7k by id
ALTER TABLE `scnSystemExceedances` ADD `acm_exceedance_ID` INTEGER;

-- update scnSystemParameters to link acm_param_7k by id
ALTER TABLE `scnSystemParameters` ADD `acm_param_ID` INTEGER;
