#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\DIS\dis-opt-gdis\List.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "0c39141896d4e20cf9f98864077751024db96f83"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.DIS.dis_opt_gdis.Pages_DIS_dis_opt_gdis_List), @"mvc.1.0.view", @"/Pages/DIS/dis-opt-gdis/List.cshtml")]
namespace MIS_PORTAL.Pages.DIS.dis_opt_gdis
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"0c39141896d4e20cf9f98864077751024db96f83", @"/Pages/DIS/dis-opt-gdis/List.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_DIS_dis_opt_gdis_List : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "0", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""col-12 col-sm-12"">
    <div class=""card"">
        <div class=""card-header pb-0 "">
            <div class=""row"">
                <div class=""col-sm-6 mg-t-10"">
                    <h5 class=""card-title"" id=""tiltle-table"">???????????????????????????????????????????????????????????????</h5>
                </div>
                <div class=""col-sm-2"">
                </div>
                <div class=""col-sm-4"">
                    <div class=""input-group"">
                        <select class=""form-control select2"" id=""search_gdishead"" name=""search_gdishead"" data-width=""100%"">
                            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "0c39141896d4e20cf9f98864077751024db96f833853", async() => {
                WriteLiteral("\r\n                                --- Select Search ---\r\n                            ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
                        </select>
                    </div><!-- input-group -->
                </div>
            </div>
        </div>
        <div class=""col-sm-12 mg-t-20"">
            <div class=""panel panel-primary tabs-style-2"">
                <div class="" tab-menu-heading"">
                    <div class=""tabs-menu1"">
                        <!-- Tabs -->
                        <ul class=""nav panel-tabs main-nav-line"">
                            <li><a href=""#tab4"" class=""nav-link active"" data-toggle=""tab"">??????????????????</a></li>
                        </ul>
                    </div>
                </div>
                <div class=""panel-body tabs-menu-body main-content-body-right border"">
                    <div class=""tab-content"">
                        <div class=""tab-pane active"" id=""tab4"">
                            <table id=""tbl-frm_gdishead"" class=""table mg-b-0-f text-md-nowrap"">
                                <thead style=""font-size:11px; text-align:center"">
       ");
            WriteLiteral(@"                             <tr>
                                        <th valign=""middle"" width=""120"" style=""width:120px;"" class=""tx-center"">&nbsp;</th>
                                        <th valign=""middle"" width=""120"" style=""width:120px;"" class=""tx-center"">&nbsp;</th>
                                        <th valign=""middle"" width=""120"" style=""width:120px;"" class=""tx-center"">&nbsp;</th>
                                        <th valign=""middle"" width=""30%"" class=""tx-center table-primary"" colspan=""3"">ST</th>
                                        <th valign=""middle"" width=""30%"" class=""tx-center table-success"" colspan=""3"">EO</th>
                                        <th valign=""middle"" width=""30%"" class=""tx-center table-info"" colspan=""3"">SP</th>
                                        <th valign=""middle"" width=""30%"" class=""tx-center table-warning"" colspan=""3"">Z4</th>
                                        <th valign=""middle"" width=""30%"" class=""tx-center table-danger"" colspan=""3"">Z5</t");
            WriteLiteral(@"h>
                                    </tr>
                                    <tr>
                                        <th valign=""middle"" class=""tx-center"">????????????????????????????????????</th>
                                        <th valign=""middle"" class=""tx-center"">?????????????????????????????????</th>
                                        <th valign=""middle"" class=""tx-center"">Code-1</th>

                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????1</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????2</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????3</th>

                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????1</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????2</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????3</th>

                                        <th valign=");
            WriteLiteral(@"""middle"" width=""10%"" class=""tx-left"">%??????1</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????2</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????3</th>

                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????1</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????2</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????3</th>

                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????1</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????2</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????3</th>

                                        <th valign=""middle"" width=""12%"" class=""tx-center"">Vat</th>

                                        <th valign=""middle"" width=""6%"" class");
            WriteLiteral(@"=""tx-center""></th>
                                    </tr>
                                </thead>
                                <tbody style=""font-size: 11px; text-align: center"">
                                    <tr>
                                        <td><select id=""search_code3"" class=""form-control""></select></td>
                                        <td><select id=""search_lov_disgroup"" class=""form-control""></select></td>
                                        <td><select id=""search_code1"" class=""form-control""></select></td>

                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""st_dis1"" placeholder=""0"" step=""1""></td>
                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""st_dis2"" placeholder=""0"" step=""1""></td>
                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""st_dis3"" placeholder=""0"" step");
            WriteLiteral(@"=""1""></td>

                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""eo_dis1"" placeholder=""0"" step=""1""></td>
                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""eo_dis2"" placeholder=""0"" step=""1""></td>
                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""eo_dis3"" placeholder=""0"" step=""1""></td>

                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""sp_dis1"" placeholder=""0"" step=""1""></td>
                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""sp_dis2"" placeholder=""0"" step=""1""></td>
                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""sp_dis3"" placeholder=""0"" step=""1""></td>

                                        <td><input type=""n");
            WriteLiteral(@"umber"" min=""0"" max=""100"" class=""form-control tx-right"" id=""z4_dis1"" placeholder=""0"" step=""1""></td>
                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""z4_dis2"" placeholder=""0"" step=""1""></td>
                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""z4_dis3"" placeholder=""0"" step=""1""></td>

                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""z5_dis1"" placeholder=""0"" step=""1""></td>
                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""z5_dis1"" placeholder=""0"" step=""1""></td>
                                        <td><input type=""number"" min=""0"" max=""100"" class=""form-control tx-right"" id=""z5_dis1"" placeholder=""0"" step=""1""></td>

                                        <td><input type=""number"" min=""0"" max=""7"" class=""form-control tx-right"" id=""vat"" placeholde");
            WriteLiteral(@"r=""0"" step=""1""></td>

                                        <td><a href=""javascript:void(0)""><span class=""badge badge-success mg-t-10""><i class=""typcn typcn-plus""></i></span></a></td>
                                    </tr>

                                </tbody>
                            </table>
                            <hr style=""margin-top:0px"">
                            <table id=""tbl-ediscount_list"" class=""table mg-b-0 text-md-nowrap"">
                                <thead style=""font-size:10px; text-align:center"">
                                    <tr>
                                        <th rowspan=""2"">#</th>
                                        <th valign=""middle"" class=""tx-center"" rowspan=""2"">????????????????????????????????????</th>
                                        <th valign=""middle"" class=""tx-center"" rowspan=""2"">?????????????????????????????????</th>
                                        <th valign=""middle"" class=""tx-center"" rowspan=""2"">Code1</th>
                                        <th vali");
            WriteLiteral(@"gn=""middle"" class=""tx-center table-primary"" colspan=""3"">ST</th>
                                        <th valign=""middle"" class=""tx-center table-success"" colspan=""3"">EO</th>
                                        <th valign=""middle"" class=""tx-center table-info"" colspan=""3"">SP</th>
                                        <th valign=""middle"" class=""tx-center table-warning"" colspan=""3"">Z4</th>
                                        <th valign=""middle"" class=""tx-center table-danger"" colspan=""3"">Z5</th>
                                    </tr>
                                    <tr>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????1</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????2</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????3</th>

                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????1</th>
                            ");
            WriteLiteral(@"            <th valign=""middle"" width=""10%"" class=""tx-left"">%??????2</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????3</th>

                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????1</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????2</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????3</th>

                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????1</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????2</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????3</th>

                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????1</th>
                                        <th valign=""middle"" width=""10%"" class=""tx-left"">%??????2</th>
                                        <th valign=""midd");
            WriteLiteral(@"le"" width=""10%"" class=""tx-left"">%??????3</th>

                                        <th valign=""middle"" width=""12%"" class=""tx-center"">Vat</th>

                                        <th valign=""middle"" width=""6%"" class=""tx-center""></th>
                                    </tr>
                                </thead>
                                <tbody style=""max-height: 500px; overflow-y: scroll; font-size: 11px; text-align: center"" class=""prnettra_list""></tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class=""col-sm-12 mg-t-20 mg-b-20"">
            <div class=""panel panel-success tabs-style-2"">
                <div class="" tab-menu-heading"">
                    <div class=""tabs-menu1"">
                        <!-- Tabs -->
                        <ul class=""nav panel-tabs main-nav-line"">
                            <li><a href=""#tab4"" class=""nav-link active");
            WriteLiteral(@""" data-toggle=""tab"">??????????????????</a></li>
                        </ul>
                    </div>
                </div>
                <div class=""panel-body tabs-menu-body main-content-body-right border"">
                    <div class=""tab-content"">
                        <div class=""tab-pane active"" id=""tab4"">
                            <table id=""tbl-emmas_list"" class=""table mg-b-0 text-md-nowrap"">
                                <thead style=""font-size:11px; text-align:center"">
                                    <tr>
                                        <th width=""3%"" class=""tx-center"">#</th>
                                        <th class=""tx-center"">????????????</th>
                                        <th class=""tx-center"">??????????????????</th>
                                        <th width=""20%"" class=""tx-center"">?????????????????????</th>
                                        <th width=""12%"" class=""tx-center"">????????????</th>
                                        <th width=""12%"" class=""tx-center"">???????????????</th>");
            WriteLiteral(@"
                                        <th width=""12%"" class=""tx-center"">?????????????????????</th>
                                        <th width=""12%"" class=""tx-center"">?????????????????????????????????</th>
                                        <th valign=""middle"" width=""6%"" class=""tx-center""></th>
                                    </tr>
                                </thead>
                                <tbody style=""font-size:11px; text-align:center"">
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
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
