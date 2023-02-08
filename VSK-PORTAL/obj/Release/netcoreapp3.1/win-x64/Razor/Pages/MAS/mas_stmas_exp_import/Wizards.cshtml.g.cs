#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\MAS\mas_stmas_exp_import\Wizards.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "711c605dc888e76f0d7722bed4364f7cba9a97cc"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.MAS.mas_stmas_exp_import.Pages_MAS_mas_stmas_exp_import_Wizards), @"mvc.1.0.view", @"/Pages/MAS/mas_stmas_exp_import/Wizards.cshtml")]
namespace MIS_PORTAL.Pages.MAS.mas_stmas_exp_import
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"711c605dc888e76f0d7722bed4364f7cba9a97cc", @"/Pages/MAS/mas_stmas_exp_import/Wizards.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_MAS_mas_stmas_exp_import_Wizards : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""col-lg-12 col-md-12"" id=""wizards"">
    <div class=""card"">
        <div id=""import"" align=""right"">

        </div>
        <div class=""card-body"">
            <div class=""row"">
                <div class=""col-lg-3 col-md-6"">
                    <div class=""card  bg-primary-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex md-mb-0"">
                                <div class=""counter-icon"">
                                    <i class=""icon icon-people""></i>
                                </div> 
                                <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลทั้งหมด</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_all"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div c");
            WriteLiteral(@"lass=""col-lg-3 col-md-6"">
                    <div class=""card  bg-danger-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex md-mb-0"">
                                <div class=""counter-icon text-warning"">
                                    <i class=""icon icon-rocket""></i>
                                </div>
                                <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลผิดพลาด</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_incomplete"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""col-lg-3 col-md-6"">
                    <div class=""card  bg-success-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex ");
            WriteLiteral(@"md-mb-0"">
                                <div class=""counter-icon text-primary"">
                                    <i class=""icon icon-docs""></i>
                                </div>
                                <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลสำเร็จ</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_complete"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""col-lg-3 col-md-6"">
                    <div class=""card  bg-warning-gradient"">
                        <div class=""card-body"">
                            <div class=""counter-status d-flex md-mb-0"">
                                <div class=""counter-icon text-success"">
                                    <i class=""icon icon-emotsmile""></i>
                                </div>
      ");
            WriteLiteral(@"                          <div class=""ml-auto"">
                                    <h5 class=""tx-13 tx-white-8 mb-3"">ข้อมูลที่ต้องแก้ไข</h5>
                                    <h2 class=""counter mb-0 text-white"" id=""countitem_problem"">0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- row closed -->
            <div id=""wizard1"">
                <h3>รายการข้อมูลทั้งหมด</h3>
                <section>

                    <div class=""row row-sm d-flex"">
                        <div class=""col-sm-7 col-md-6 col-lg-4"">
                            <div class=""custom-file"">
                                <input class=""custom-file-input"" id=""customFile"" type=""file"" accept="".xlsx"" required> <label class=""custom-file-label"" for=""customFile"">Choose file</label>
                            </div>
                        </div>
                        <d");
            WriteLiteral("iv class=\"col-sm-2\">\r\n                            <button type=\"button\" id=\"btn_downloadtemplate\" target=\"_blank\" class=\"btn btn-sm btn-primary btn-with-icon btn-block\">Download Template</button>\r\n");
            WriteLiteral(@"                        </div>
                        <div class=""col-sm-2"">
                            <button type=""button"" id=""btn_error_stmas_exp"" target=""_blank"" class=""btn btn-sm btn-danger btn-with-icon btn-block btn_error_stmas_exp"">Error StmasExp Export</button>
                        </div>
                        <div class=""alert alert-solid-danger mg-b-0 mg-l-auto chk_code"" role=""alert"">
                            <span class=""alert-inner--icon""><i class=""fe fe-slash""></i></span>
                            <span class=""alert-inner--text""><strong>มีรหัสสินค้าพ่วงไม่ครบ</strong> ระบบไม่สามารถทำงานต่อได้ กรุณาตรวจสอบข้อมูล</span>
                        </div>
                    </div>

                    <div class=""row row-sm"">
                        <div class=""col-md-12"">
                            <div class=""border-top my-3""></div>
                            <div class=""mg-t-20"">
                                <table id=""tbl-list-temp"" class=""table table-responsive tab");
            WriteLiteral(@"le-bordered table-striped  mg-b-0 text-md-nowrap "">
                                    <thead>
                                        <tr>
                                            <th>#<br />&nbsp;<br />&nbsp;</th>
                                            <th>Status<br />&nbsp;<br />&nbsp;</th>
                                            <th><div style=""width: 150px;text-align:center;"">STATUS TEXT<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 170px;text-align:center;"">ITEM CODE REF<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 300px;text-align:center;"">ITEM NAME REF<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 170px;text-align:center;"">ITEM CODE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 300px;text-align:center;"">ITEM NAME<br />&nbsp;<br />&nbsp;</div></th>
          ");
            WriteLiteral(@"                                  <th><div style=""width: 300px;text-align:center;"">ITEM NAME COMPARE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 120px;text-align:center;"">RESULTS<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;"">BARCODE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;"">SPCODES<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>UOM<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 170px;text-align:center;'>GNAMECHR ABBRE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 170px;text-align:center;"">CODE1_GNAMECHR<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div sty");
            WriteLiteral(@"le=""width: 90px;text-align:center;"">GNAMECHR<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 120px;text-align:center;"">CODE2_GMODEL<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">GMODEL<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">CODE3_TYPE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">TYPE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">CODE4_GUSED<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">GUSED<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">CODE5_GOEM<br />&nbsp;<br />");
            WriteLiteral(@"&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">GOEM<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR BRAND<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR type<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR MODEL<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR FM YEAR<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR TO YEAR<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>G MODEL<br />&nbsp;<br />&nbsp;</div></th>
                                           ");
            WriteLiteral(@" <th><div style='width: 120px;text-align:center;'>CAR GENERATION<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR ENGINE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR BODY<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 300px;text-align:center;'>NOTE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CODE OEM<br />&nbsp;<br />&nbsp;</div></th>
                                    <tbody id=""tbl-list-temp-tbody"">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <h3>รายการที่สามารนำเข้าได้</h3>
                <section style=""margin-top");
            WriteLiteral(@":-35px;"">

                    <div class=""row row-sm"">
                        <div class=""col-sm-12 d-flex flex-row justify-content-end"">
                            <button type=""button"" id=""btn_error_stmas_exp"" target=""_blank"" class=""col-sm-2 btn btn-sm btn-danger btn-with-icon btn-block btn_error_stmas_exp"">Error StmasExp Export</button>
                        </div>
                    </div>

                    <div class=""row row-sm"">
                        <div class=""col-md-12"">
                            <div class=""border-top my-3""></div>
                            <div class=""mg-t-20"">
                                <table id=""tbl-list-temp-1"" class=""table table-responsive table-bordered table-striped  mg-b-0 text-md-nowrap "">
                                    <thead>
                                        <tr>
                                            <th>#<br />&nbsp;<br />&nbsp;</th>
                                            <th>Status<br />&nbsp;<br />&nbsp;</th>
            WriteLiteral(@"
                                            <th><div style=""width: 150px;text-align:center;"">STATUS TEXT<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 170px;text-align:center;"">ITEM CODE REF<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 300px;text-align:center;"">ITEM NAME REF<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 170px;text-align:center;"">ITEM CODE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 300px;text-align:center;"">ITEM NAME<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 300px;text-align:center;"">ITEM NAME COMPARE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 120px;text-align:center;"">RESULTS<br />&nbsp;<br />&nbsp;</div></th>
                                  ");
            WriteLiteral(@"          <th><div style=""width: 150px;text-align:center;"">BARCODE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;"">SPCODES<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>UOM<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 170px;text-align:center;'>GNAMECHR ABBRE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 170px;text-align:center;"">CODE1_GNAMECHR<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">GNAMECHR<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 120px;text-align:center;"">CODE2_GMODEL<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:ce");
            WriteLiteral(@"nter;"">GMODEL<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">CODE3_TYPE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">TYPE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">CODE4_GUSED<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">GUSED<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">CODE5_GOEM<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">GOEM<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR BRAND<br />&nbsp;<br />&nbsp;</div></th>
                  ");
            WriteLiteral(@"                          <th><div style='width: 90px;text-align:center;'>CAR type<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR MODEL<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR FM YEAR<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR TO YEAR<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>G MODEL<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 120px;text-align:center;'>CAR GENERATION<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR ENGINE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 9");
            WriteLiteral(@"0px;text-align:center;'>CAR BODY<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 300px;text-align:center;'>NOTE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CODE OEM<br />&nbsp;<br />&nbsp;</div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <h3>รายการที่นำเข้าสำเร็จแล้ว</h3>
                <section style =""margin-top:-35px;"">

                    <div class=""row row-sm"">
                        <div class=""col-sm-12 d-flex flex-row justify-content-end"">
                            <button type=""button"" id=""btn_error_stmas_exp"" target=""_blank"" cl");
            WriteLiteral(@"ass=""col-sm-2 btn btn-sm btn-danger btn-with-icon btn-block btn_error_stmas_exp"">Error StmasExp Export</button>
                        </div>
                    </div>

                    <div class=""row row-sm"">
                        <div class=""col-md-12"">
                            <div class=""border-top my-3""></div>
                            <div class=""mg-t-20"">
                                <table id=""tbl-list-temp-2"" class=""table table-responsive table-bordered table-striped  mg-b-0 text-md-nowrap "">
                                    <thead>
                                        <tr>
                                            <th>#<br />&nbsp;<br />&nbsp;</th>
                                            <th>Status<br />&nbsp;<br />&nbsp;</th>
                                            <th><div style=""width: 150px;text-align:center;"">STATUS TEXT<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 170px;text-align:center;"">IT");
            WriteLiteral(@"EM CODE REF<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 300px;text-align:center;"">ITEM NAME REF<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 170px;text-align:center;"">ITEM CODE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 300px;text-align:center;"">ITEM NAME<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 300px;text-align:center;"">ITEM NAME COMPARE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 120px;text-align:center;"">RESULTS<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;"">BARCODE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 150px;text-align:center;"">SPCODES<br />&nbsp;<br />&nbsp;</div></th");
            WriteLiteral(@">
                                            <th><div style='width: 90px;text-align:center;'>UOM<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 170px;text-align:center;'>GNAMECHR ABBRE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 170px;text-align:center;"">CODE1_GNAMECHR<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">GNAMECHR<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 120px;text-align:center;"">CODE2_GMODEL<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">GMODEL<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">CODE3_TYPE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th>");
            WriteLiteral(@"<div style=""width: 90px;text-align:center;"">TYPE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">CODE4_GUSED<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">GUSED<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">CODE5_GOEM<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style=""width: 90px;text-align:center;"">GOEM<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR BRAND<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR type<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR MODEL<br />&nbsp;<br /");
            WriteLiteral(@">&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR FM YEAR<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR TO YEAR<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>G MODEL<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 120px;text-align:center;'>CAR GENERATION<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR ENGINE<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 90px;text-align:center;'>CAR BODY<br />&nbsp;<br />&nbsp;</div></th>
                                            <th><div style='width: 300px;text-align:center;'>NOTE<br />&nbsp;<br />&nbsp;</div></th>
                                  ");
            WriteLiteral(@"          <th><div style='width: 90px;text-align:center;'>CODE OEM<br />&nbsp;<br />&nbsp;</div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    </section>

</div>
        </div>
        <div class=""border-top my-3""></div>
        <div class=""table-responsive mg-t-20"">
            <table id=""tbl-list"" class=""table table-bordered table-striped table-hover mg-b-0 text-md-nowrap""></table>
        </div>
    </div>
</div>
");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591